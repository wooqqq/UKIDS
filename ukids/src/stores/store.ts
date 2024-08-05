import { create } from 'zustand';

interface Store {
  familyId: number;
  chatRoomId: number;

  setChatRoomId: () => void;
}

const useStore = create<Store>((set) => ({
  familyId: 0,
  chatRoomId: 0,

  setfamilyId: () => set({}),
  setChatRoomId: () => set({}),
}));

export default useStore;
