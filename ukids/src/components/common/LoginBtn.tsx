import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const LoginBtn = () => {
  const nav = useNavigate();
  // 로그인페이지로 이동
  const handleLoginClick = () => {
    nav('/login');
  };
  // 회원가입 페이지로 이동
  const handleJoinClick = () => {
    nav('/join');
  };
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    if (token) {
      console.log('gg');
    }
  }, [token]);
  return (
    <div>
      <button onClick={handleLoginClick}>로그인</button>
      <button onClick={handleJoinClick}>회원가입</button>
    </div>
  );
};

export default LoginBtn;
