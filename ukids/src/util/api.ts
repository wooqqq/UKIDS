// API 모듈화
import axios from 'axios';

// 로컬스토리지에서 토큰 가져오기
const token = localStorage.getItem('token');

// axios 인스턴스 생성
const api = axios.create({
  // baseURL: 'https://i11b306.p.ssafy.io/api',
  baseURL: 'http://localhost:8080/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '', // 초기화 시점에 토큰이 있으면 설정
    'Content-Type': 'application/json',
  },
});

export default api;
