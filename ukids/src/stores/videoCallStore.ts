import create from 'zustand';
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from 'openvidu-browser';
import api from '../util/api';

interface VideoCallStore {
  session: OVSession | null; // 현재 OpenVidu 세션을 저장하는 상태
  OV: OpenVidu | null; // OpenVidu 인스턴스를 저장하는 상태
  subscribers: { subscriber: Subscriber; name: string }[]; // 구독자 목록을 저장하는 상태
  publisher: { publisher: Publisher; name: string } | null; // 퍼블리셔(발행자) 정보를 저장하는 상태
  isVideoEnabled: boolean; // 비디오가 활성화 되었는지 여부를 저장하는 상태
  isAudioEnabled: boolean; // 오디오가 활성화 되었는지 여부를 저장하는 상태
  sessionId: string; // 현재 세션 ID를 저장하는 상태
  userName: string; // 사용자 이름을 저장하는 상태
  isChatting: boolean; // 채팅 중인지 여부를 저장하는 상태
  setIsChatting: (value: boolean) => void; // 채팅 상태를 설정하는 함수
  joinSession: (sessionId: string, userName: string) => Promise<void>; // 세션에 참여하는 함수
  leaveSession: () => void; // 세션에서 나가는 함수
  setSessionId: (sessionId: string) => void; // 세션 ID를 설정하는 함수
  setUserName: (userName: string) => void; // 사용자 이름을 설정하는 함수
  toggleVideo: () => void; // 비디오 상태를 토글하는 함수
  toggleAudio: () => void; // 오디오 상태를 토글하는 함수
}

// 상태 관리를 위한 zustand 스토어 생성
export const useVideoCallStore = create<VideoCallStore>((set, get) => ({
  session: null, // 초기값 null
  OV: null, // 초기값 null
  subscribers: [], // 초기값 빈 배열
  publisher: null, // 초기값 null
  isVideoEnabled: false, // 초기값 false
  isAudioEnabled: false, // 초기값 false
  sessionId: '', // 초기값 빈 문자열
  userName: '', // 초기값 빈 문자열
  isChatting: false, // 초기값 false
  setIsChatting: (value) => set(() => ({ isChatting: value })), // isChatting 상태 설정

  // 세션에 참여하는 함수
  joinSession: async (sessionId, userName) => {
    const OV = new OpenVidu(); // 새로운 OpenVidu 인스턴스 생성
    set({ OV });

    const session = OV.initSession(); // 새로운 세션 초기화
    set({ session });

    // 스트림이 파괴될 때 구독자 목록에서 제거
    session.on('streamDestroyed', (event) => {
      const newSubscribers = get().subscribers.filter(
        (sub) => sub.subscriber.stream.streamId !== event.stream.streamId,
      );
      set({ subscribers: newSubscribers });
    });

    // 새로운 스트림이 생성되었을 때 구독자 목록에 추가
    session.on('streamCreated', (event) => {
      const newSubscriber = session.subscribe(event.stream, '');
      const userData = JSON.parse(
        event.stream.connection.data.split('%/%')[0],
      ).clientData;
      set((state) => ({
        subscribers: [
          ...state.subscribers,
          { subscriber: newSubscriber, name: userData },
        ],
      }));
    });

    try {
      const token = await getToken(sessionId); // 세션에 접속하기 위한 토큰을 가져옴
      await session.connect(token, { clientData: userName }); // 세션에 연결

      // 퍼블리셔 초기화
      const publisher = OV.initPublisher(undefined, {
        audioSource: undefined, // 사용자가 직접 설정한 오디오 소스 사용
        videoSource: undefined, // 사용자가 직접 설정한 비디오 소스 사용
        publishAudio: get().isAudioEnabled, // 현재 오디오 상태
        publishVideo: get().isVideoEnabled, // 현재 비디오 상태
        mirror: false, // 거울 효과를 사용하지 않음
      });

      session.publish(publisher); // 세션에 퍼블리셔 추가
      set({ publisher: { publisher, name: userName } }); // 퍼블리셔 상태 설정
    } catch (error) {
      console.error('Failed to join the session:', error); // 에러 발생 시 로그 출력
    }
  },

  // 세션에서 나가는 함수
  leaveSession: () => {
    const { session } = get();
    if (session) {
      session.disconnect(); // 세션 연결 끊기
    }
    set({
      OV: null,
      session: null,
      subscribers: [],
      publisher: null,
      isVideoEnabled: false,
      isAudioEnabled: false,
    });
  },

  // 비디오 상태를 토글하는 함수
  toggleVideo: () => {
    set((state) => {
      if (state.publisher) {
        const newVideoState = !state.isVideoEnabled;
        state.publisher.publisher.publishVideo(newVideoState); // 비디오 상태 변경
        return { isVideoEnabled: newVideoState };
      }
      return state;
    });
  },

  // 오디오 상태를 토글하는 함수
  toggleAudio: () => {
    set((state) => {
      if (state.publisher) {
        const newAudioState = !state.isAudioEnabled;
        state.publisher.publisher.publishAudio(newAudioState); // 오디오 상태 변경
        return { isAudioEnabled: newAudioState };
      }
      return state;
    });
  },

  // 세션 ID 설정
  setSessionId: (sessionId: string) => set(() => ({ sessionId })),

  // 사용자 이름 설정
  setUserName: (userName: string) => set(() => ({ userName })),
}));

// 세션에 접속하기 위한 토큰을 가져오는 함수
async function getToken(sessionId: string): Promise<string> {
  try {
    console.log(`sessionIds: ${sessionId}`);
    const token = await createToken(sessionId); // 토큰 생성 함수 호출
    console.log(`token: ${token}`);
    return token;
  } catch (error) {
    throw new Error('Failed to get token.');
  }
}

// 서버에서 토큰을 생성하는 함수
const createToken = (familyId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    api
      .post(`/webrtc/${familyId}`, {}) // 서버 API 호출
      .then((response) => {
        resolve((response.data as { result: string }).result); // 응답에서 토큰 추출
      })
      .catch((error) => reject(error)); // 에러 처리
  });
};
