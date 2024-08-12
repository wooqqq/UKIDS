import { create } from 'zustand';
import api from '../util/api';

interface User {
  userId: number;
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

interface Family {
  familyId: number;
  name: string;
  code: string;
  userFamilyDto: User;
}

// 가족방 관련 상태 정의
interface FamilyState {
  family: Family[];
  error: string | null;
  // 가족방 정보
  fetchFamilyInfo: (familyId: number) => Promise<void>;
  // 가족방 생성
  createFamily: (name: string, password: string) => Promise<void>;
  // 가족방 찾기
  findFamily: (code: string) => Promise<void>;
  // 내가 속한 가족방 전체 리스트 조회
  fetchFamilyList: () => Promise<void>;
  // 가족방 수정
  updateFamily: (
    familyId: number,
    representative: number,
    name: string,
    password: string,
  ) => Promise<void>;
  // 가족방 비밀번호 확인
  checkedPassword: (familyId: number, password: string) => Promise<void>;
  // 가족방 삭제
  deleteFamily: (familyId: number, password: string) => Promise<void>;

  // 가족 id
  selectedFamilyId: number | null;
  setSelectedFamilyId: (familyId: number) => void;
  // 채팅방 id
  chatRoomId: number | null;
}

// familyStore 생성
export const useFamilyStore = create<FamilyState>((set) => ({
  // 초기 상태 설정
  family: [],
  error: null,
  selectedFamilyId: Number(localStorage.getItem('selectedFamilyId')) || null,
  chatRoomId: null,

  setSelectedFamilyId: (familyId: number) => {
    localStorage.setItem('selectedFamilyId', String(familyId));
    set({ selectedFamilyId: familyId });
  },

  // 가족방 정보 가져오기
  fetchFamilyInfo: async (familyId: number) => {
    try {
      const response = await api.get(`/family/${familyId}`);

      const familyData: Family = response.data.result;

      set({
        family: [familyData],
        error: null,
        selectedFamilyId: familyData.familyId,
      });
    } catch (error: any) {
      console.error('Error fetching family info', error);
      set({ error: error.message });
    }
  },

  // 가족방 생성
  createFamily: async (name: string, password: string) => {
    try {
      const response = await api.post(`/family`, { name, password });
      const newFamily: Family = response.data.result;
      set((state) => ({
        family: [...state.family, newFamily],
        error: null,
        selectedFamilyId: newFamily.familyId,
      }));

      // 가족방 생성 시 나무 자동 생성
      await api.post(`/tree`, { familyId: newFamily.familyId });
      // 대화방 생성
      const chatRoomResponse = await api.post(`/chat/room`, {
        familyId: newFamily.familyId,
      });
      // 채팅방 ID 추출
      const chatRoomId = chatRoomResponse.data.result.chatRoomId;
      // 채팅방 ID 상태에 저장
      set({ chatRoomId });

      // webRTC 세션 생성
      await api.post(`/webrtc`, { familyId: newFamily.familyId });

      // 추가적인 처리 (예: 생성된 가족방으로 이동 등)
      if (response.data.code === 201) {
        alert(`${newFamily.name} 가족방이 생성되었습니다.`);
      }
    } catch (error: any) {
      console.error('Error creating family', error);
      set({ error: error.message });
    }
  },

  // 가족방 찾기
  findFamily: async (code: string) => {
    try {
      const response = await api.get(`/family/search/${code}`);
      const familyData: Family = response.data.result;
      set((state) => ({
        family: [...state.family, familyData],
        error: null,
        selectedFamilyId: familyData.familyId,
      }));
    } catch (error: any) {
      console.log('Error finding family', error);
      set({ error: error.message });
    }
  },

  // 내가 속한 가족방 전체 리스트 조회
  fetchFamilyList: async () => {
    try {
      const response = await api.get(`/family/all`);
      const familyList: Family[] = response.data.result;
      set({ family: familyList, error: null });
    } catch (error: any) {
      console.log('Error fetching family list', error);
      set({ error: error.message });
    }
  },

  // 가족방 수정
  updateFamily: async (
    familyId: number,
    representative: number,
    name: string,
    password: string,
  ) => {
    try {
      const response = await api.put(`/family`, {
        familyId,
        representative,
        name,
        password,
      });
      const updatedFamily = response.data.result;

      set((state) => ({
        family: state.family.map((fam) =>
          fam.familyId === familyId ? updatedFamily : fam,
        ),
        error: null,
      }));

      if (response.data.code === 201) {
        alert('가족방 정보가 수정되었습니다.');
      }
    } catch (error: any) {
      console.log('Error updating family', error);
      set({ error: error.message });
    }
  },

  // 가족방 비밀번호 확인
  checkedPassword: async (familyId: number, password: string) => {
    try {
      const response = await api.post(`/family/pwcheck`, {
        familyId,
        password,
      });
      if (response.data.code !== 201) {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error: any) {
      console.log('Error checking family password', error);
      set({ error: error.message });
    }
  },

  // 가족방 삭제
  deleteFamily: async (familyId: number, password: string) => {
    try {
      const response = await api.delete(`/family`, {
        data: {
          familyId,
          password,
        },
      });
      if (response.data.code === 200) {
        alert('가족방이 삭제되었습니다.');
        set((state) => ({
          family: state.family.filter((fam) => fam.familyId !== familyId),
          error: null,
          selectedFamilyId:
            state.selectedFamilyId === familyId ? null : state.selectedFamilyId,
        }));
      }
    } catch (error: any) {
      console.log('Error deleting family', error);
      set({ error: error.message });
    }
  },
}));
