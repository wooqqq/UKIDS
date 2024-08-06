import { create } from 'zustand';
import axios from 'axios';

interface Store {
  ukidsURL: string;
  loading: boolean;
  error: string | null;

  familyId: string;
  chatRoomId: string;
  setfamilyId: () => void;
  setChatRoomId: () => void;
}

const ukidsURL = `https://i11b306.p.ssafy.io`;

const useStore = create<Store>((set) => ({
  ukidsURL: ukidsURL,
  loading: false,
  error: null,

  familyId: '',
  chatRoomId: '',
  setfamilyId: () => async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${ukidsURL}/chat-room`);
      set({ chatRoomId: response.data.familyId, loading: false });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  setChatRoomId: () => async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${ukidsURL}/chat-room`);
      set({ chatRoomId: response.data.familyId, loading: false });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));

export default useStore;
