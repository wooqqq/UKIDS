import {
  LocalVideoTrack,
  LocalAudioTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from 'livekit-client';
import './VideoCall.css';
import { useState } from 'react';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

// 개발 환경을 위한 기본 URL 설정
let APPLICATION_SERVER_URL = '';
let LIVEKIT_URL = '';
configureUrls();

function configureUrls() {
  // APPLICATION_SERVER_URL이 설정되지 않은 경우, 로컬 개발 환경의 기본 값을 사용
  if (!APPLICATION_SERVER_URL) {
    if (window.location.hostname === 'localhost') {
      APPLICATION_SERVER_URL = 'http://localhost:6080/';
    } else {
      APPLICATION_SERVER_URL = 'https://' + window.location.hostname + ':6443/';
    }
  }

  // LIVEKIT_URL이 설정되지 않은 경우, 로컬 개발 환경의 기본 값을 사용
  if (!LIVEKIT_URL) {
    if (window.location.hostname === 'localhost') {
      LIVEKIT_URL = 'ws://localhost:7880/';
    } else {
      LIVEKIT_URL = 'wss://' + window.location.hostname + ':7443/';
    }
  }
}

function VideoCall() {
  const [room, setRoom] = useState<Room | undefined>(undefined); // 방 객체 상태 관리
  const [localVideoTrack, setLocalVideoTrack] = useState<
    LocalVideoTrack | undefined
  >(undefined); // 로컬 비디오 트랙 상태 관리
  const [localAudioTrack, setLocalAudioTrack] = useState<
    LocalAudioTrack | undefined
  >(undefined); // 로컬 오디오 트랙 상태 관리
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]); // 원격 트랙 정보 상태 관리

  const [participantName, setParticipantName] = useState(
    'Participant' + Math.floor(Math.random() * 100),
  ); // 참가자 이름 상태 관리
  const [roomName, setRoomName] = useState('Test Room'); // 방 이름 상태 관리

  const [isVideoEnabled, setIsVideoEnabled] = useState(true); // 비디오 활성화 상태 관리
  const [isAudioEnabled, setIsAudioEnabled] = useState(true); // 오디오 활성화 상태 관리

  // 방에 참여하는 함수
  async function joinRoom() {
    const room = new Room();
    setRoom(room);

    // 새로운 트랙을 받을 때마다 실행
    room.on(
      RoomEvent.TrackSubscribed,
      (
        _track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant,
      ) => {
        setRemoteTracks((prev) => [
          ...prev,
          {
            trackPublication: publication,
            participantIdentity: participant.identity,
          },
        ]);
      },
    );

    // 트랙이 제거될 때마다 실행
    room.on(
      RoomEvent.TrackUnsubscribed,
      (_track: RemoteTrack, publication: RemoteTrackPublication) => {
        setRemoteTracks((prev) =>
          prev.filter(
            (track) => track.trackPublication.trackSid !== publication.trackSid,
          ),
        );
      },
    );

    try {
      // 서버에서 토큰을 받아옴
      const token = await getToken(roomName, participantName);

      // LiveKit URL과 토큰을 사용하여 방에 연결
      await room.connect(LIVEKIT_URL, token);

      // 카메라와 마이크를 활성화하여 퍼블리시
      await room.localParticipant.enableCameraAndMicrophone();

      // 로컬 비디오 및 오디오 트랙 설정
      setLocalVideoTrack(
        room.localParticipant.videoTrackPublications.values().next().value
          .videoTrack,
      );
      setLocalAudioTrack(
        room.localParticipant.audioTrackPublications.values().next().value
          .audioTrack,
      );
    } catch (error) {
      console.log(
        '방에 연결하는 동안 오류가 발생했습니다:',
        (error as Error).message,
      );
      await leaveRoom();
    }
  }

  // 방을 떠나는 함수
  async function leaveRoom() {
    await room?.disconnect(); // 방에서 연결을 끊음

    // 상태 초기화
    setRoom(undefined);
    setLocalVideoTrack(undefined);
    setLocalAudioTrack(undefined);
    setRemoteTracks([]);
  }

  // 서버에서 토큰을 받아오는 함수
  async function getToken(roomName: string, participantName: string) {
    const response = await fetch(APPLICATION_SERVER_URL + 'token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName: roomName,
        participantName: participantName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`토큰을 가져오는 데 실패했습니다: ${error.errorMessage}`);
    }

    const data = await response.json();
    return data.token;
  }

  // 비디오 토글 함수
  const toggleVideo = () => {
    if (localVideoTrack) {
      if (isVideoEnabled) {
        localVideoTrack.mute(); // 비디오 비활성화
      } else {
        localVideoTrack.unmute(); // 비디오 활성화
      }
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  // 오디오 토글 함수
  const toggleAudio = () => {
    if (localAudioTrack) {
      if (isAudioEnabled) {
        localAudioTrack.mute(); // 오디오 비활성화
      } else {
        localAudioTrack.unmute(); // 오디오 활성화
      }
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <>
      {!room ? (
        <div id="join">
          <div id="join-dialog">
            <h2>Join a Video Room</h2>
            <form
              onSubmit={(e) => {
                joinRoom();
                e.preventDefault();
              }}
            >
              <div>
                <label htmlFor="participant-name">참여자: </label>
                <input
                  id="participant-name"
                  className="form-control"
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="room-name">방: </label>
                <input
                  id="room-name"
                  className="form-control"
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-slate-800 text-white"
                type="submit"
                disabled={!roomName || !participantName}
              >
                참여하기
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div id="room">
          <div id="room-header">
            <h2 id="room-title">{roomName}</h2>
            <button
              className="btn btn-danger"
              id="leave-room-button"
              onClick={leaveRoom}
            >
              종료하기
            </button>
            <button className="btn btn-secondary" onClick={toggleVideo}>
              {isVideoEnabled ? '비디오 끄기' : '비디오 켜기'}
            </button>
            <button className="btn btn-secondary" onClick={toggleAudio}>
              {isAudioEnabled ? '음소거' : '음소거 해제'}
            </button>
          </div>
          <div id="layout-container">
            {localVideoTrack && (
              <VideoComponent
                track={localVideoTrack}
                participantIdentity={participantName}
                local={true}
              />
            )}
            {remoteTracks.map((remoteTrack) =>
              remoteTrack.trackPublication.kind === 'video' ? (
                <VideoComponent
                  key={remoteTrack.trackPublication.trackSid}
                  track={remoteTrack.trackPublication.videoTrack!}
                  participantIdentity={remoteTrack.participantIdentity}
                />
              ) : (
                <AudioComponent
                  key={remoteTrack.trackPublication.trackSid}
                  track={remoteTrack.trackPublication.audioTrack!}
                />
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default VideoCall;
