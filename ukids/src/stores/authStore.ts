import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;

  ukidsURL: string;
  loading: boolean;
  error: string | null;

  familyId: number;
  chatRoomId: number;
  setfamilyId: (name: string, password: string) => void;
  setChatRoomId: (familyId: number) => void;
}

const ukidsURL = `https://i11b306.p.ssafy.io`;

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  setToken: (token) => set({ token }),

  ukidsURL: ukidsURL,
  loading: false,
  error: null,

  familyId: NaN,
  chatRoomId: NaN,
  // 가족방 생성 시 가족방 ID 얻어오기
  setfamilyId: (name, password) => async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `/api/family`,
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
        familyId: Number.parseInt(response.data.familyId),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  // 가족방 생성 시 채팅방 ID 얻어오기
  setChatRoomId: (familyId) => async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`/api/chat/room`, {
        familyId,
      });
      set({
        chatRoomId: Number.parseInt(response.data.result.chatRoomId),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
