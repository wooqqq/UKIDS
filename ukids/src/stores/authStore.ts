import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import api from '../util/api';

interface AuthState {
  token: string | null;
  decodedToken: any;
  setToken: (token: string | null) => void;

  ukidsURL: string;
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
  },

  // 기본 값들
  ukidsURL: ukidsURL,
  error: null,

  /***** 각종 방 ID들 설정 *****/

  // 가족방 생성 시 가족방 ID 얻어오고
  // openvidu sessionId 생성 요청하기
  // 가족 ID로 채팅방 ID 얻어오기
  familyId: NaN,
  setfamilyId: (name, password) => async () => {
    try {
      const response = await api.post(`/family`, { name, password });
      const newFamilyId = Number.parseInt(response.data.familyId);

      set({ familyId: newFamilyId });

      await api.post(`/webrtc`, { familyId: newFamilyId });
      await get().setChatRoomId(newFamilyId);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  // 가족 ID로 채팅방 ID 얻어오기
  chatRoomId: NaN,
  setChatRoomId: (familyId) => async () => {
    set({ error: null });
    try {
      const response = await api.post(`/chat/room`, { familyId });
      set({ chatRoomId: Number.parseInt(response.data.chatRoomId) });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
