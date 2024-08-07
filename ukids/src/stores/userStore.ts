import { create } from 'zustand';
import axios from 'axios';

interface Store {
  ukidsURL: string;
  loading: boolean;
  error: string | null;

  userToken: string;

  familyId: number;
  chatRoomId: number;
  setfamilyId: (name: string, password: string) => void;
  setChatRoomId: (familyId: number) => void;
}

const ukidsURL = `https://i11b306.p.ssafy.io`;
// 로그인 구현 시 추가
const userToken = '';

const useUserStore = create<Store>((set) => ({
  ukidsURL: ukidsURL,
  loading: false,
  error: null,

  // 로그인 구현 시 userToken 추가
  userToken: userToken,

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
            Authorization: `Bearer ${userToken}`,
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

export default useUserStore;
