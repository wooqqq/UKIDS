import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 초기 토큰 값: localStorage에서 불러옴
  token: localStorage.getItem('token'),

  // 토큰 설정 함수
  setToken: (token: string | null) => {
    // 토큰이 null이 아니면 localStorage에 저장, null이면 localStorage에서 제거
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    // 상태 업데이트
    set({ token });
  },
}));
