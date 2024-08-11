import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import api from '../util/api';

// 타입스크립트 타입 설정...
interface User {
  userId: number;
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;

  ukidsURL: string;
  error: string | null;

  // 회원정보조회
  userInfo: User | null;
  getUserInfo: () => Promise<void>;

  familyId: number;
  setfamilyId: (name: string, password: string) => void;

  chatRoomId: number;
  setChatRoomId: (familyId: number) => void;
}

// 자동 로그아웃 테스트
// localStorage.setItem(
//   'token',
//   'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlkIjoidXNlcjEiLCJuYW1lIjoi6rmA7Iu47ZS8IiwicGhvbmUiOiIwMTAtMTIxMi0xMjEyIiwiZW1haWwiOiJ3d3dAYXNzZGYuY29tIiwiaWF0IjoxNzIzMDgwMjUwLCJleHAiOjE3MjMwODM4NTB9.HRFEqm_i66m4JOa5yUEFlNHb7BQkuvV8mW_a-wnc2Sk',
// );
const ukidsURL = `http://localhost:8080`;
// const ukidsURL = `https://i11b306.p.ssafy.io`;

export const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 토큰 값: localStorage에서 불러옴
  token: localStorage.getItem('token'),

  // 토큰 설정 함수
  setToken: (token: string | null) => {
    // 상태 업데이트
    set({ token });

    // 토큰 담김
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  //   // 초기 토큰 값: localStorage에서 불러옴
  // token: localStorage.getItem('token'),
  // decodedToken: localStorage.getItem('token')
  //   ? jwtDecode(localStorage.getItem('token')!)
  //   : null,
  // // 토큰이 있는 경우 디코딩하여 상태에 저장
  // setToken: (token) => {
  //   // 상태 업데이트
  //   set({ token });
  //   // 토큰 담김
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       set({ decodedToken: decoded });
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('user', JSON.stringify(decoded));
  //     } catch (error) {
  //       console.error('Token decoding failed', error);
  //       set({ decodedToken: null });
  //     }
  //   } else {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     set({ decodedToken: null });
  //   }

  // 기본 값들
  ukidsURL: ukidsURL,
  error: null,

  /***** 회원 정보 관리 *****/
  userInfo: null,

  getUserInfo: async () => {
    try {
      const token = get().token;

      if (token) {
        const decodedToken: User = jwtDecode(token);
        const userId = decodedToken.userId; // 토큰에서 userId 추출
        // console.log('디코딩!!!!!!!!!!' + decodedToken + userId);
        const response = await api.get(`/user/${userId}`);
        const userData = response.data.result;

        set({ userInfo: userData });
      } else {
        throw new Error('토큰 없음');
      }
    } catch (error: any) {
      console.error('Error fetching user info', error);
      // 자동 로그아웃 처리
      localStorage.removeItem('token');
      set({ token: null, userInfo: null });
      alert('로그인한지 1시간이 경과되어 자동 로그아웃 됩니다.');
    }
  },

  /***** 각종 방 ID들 설정 *****/

  // 가족방 생성 시 가족방 ID 얻어오고
  // openvidu sessionId 생성 요청하기
  // 가족 ID로 채팅방 ID 생성하기
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

  // 가족 ID로 채팅방 ID 생성하기
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
