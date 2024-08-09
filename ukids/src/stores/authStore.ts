import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// 타입스크립트 타입 설정...
interface AuthState {
  token: string | null;
  decodedToken: any;
  setToken: (token: string | null) => void;

  ukidsURL: string;
  loading: boolean;
  error: string | null;

  familyId: number;
  setfamilyId: (name: string, password: string) => void;

  chatRoomId: number;
  setChatRoomId: (familyId: number) => void;
}

const ukidsURL = `https://i11b306.p.ssafy.io`;

export const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 토큰 값: localStorage에서 불러옴
  token: localStorage.getItem('token'),
  decodedToken: localStorage.getItem('token')
    ? jwtDecode(localStorage.getItem('token')!)
    : null,
  // 토큰이 있는 경우 디코딩하여 상태에 저장
  setToken: (token) => {
    // 상태 업데이트
    set({ token });
    // 토큰 담김
    if (token) {
      try {
        const decoded = jwtDecode(token);
        set({ decodedToken: decoded });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decoded));
      } catch (error) {
        console.error('Token decoding failed', error);
        set({ decodedToken: null });
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ decodedToken: null });
    }

    // 초기 토큰 값: localStorage에서 불러옴
    // token: localStorage.getItem('token'),

    // // 토큰 설정 함수
    // setToken: (token: string | null) => {
    //   // 토큰이 null이 아니면 localStorage에 저장, null이면 localStorage에서 제거
    //   if (token) {
    //     localStorage.setItem('token', token);
    //   } else {
    //     localStorage.removeItem('token');
    //   }

    //   // 상태 업데이트
    //   set({ token });
    // },
  },

  // 기본 값들
  ukidsURL: ukidsURL,
  loading: false,
  error: null,

  /***** 각종 방 ID들 설정 *****/

  // 가족방 생성 시 가족방 ID 얻어오기
  familyId: NaN,
  setfamilyId: (name, password) => async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${ukidsURL}/api/family`,
        {
          name,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
        },
      );
      set({
        familyId: Number.parseInt(response.data),
        loading: false,
      });

      // 채팅방 ID 생성
      get().setChatRoomId;
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  // 가족방 생성 시 가족 ID로 채팅방 ID 얻어오기
  chatRoomId: NaN,
  setChatRoomId: (familyId) => async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${ukidsURL}/api/chat/room`, {
        familyId,
      });
      set({
        chatRoomId: Number.parseInt(response.data),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));