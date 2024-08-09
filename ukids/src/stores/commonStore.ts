import { create } from 'zustand';

interface CommonState {
  isChatting: boolean;
  setIsChatting: (value: boolean) => void;
}

export const useCommonStore = create<CommonState>((set) => ({
  isChatting: false,
  setIsChatting: (value) => set(() => ({ isChatting: value })),
}));
