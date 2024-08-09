import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import ProfileBtn from './common/ProfileButton';
import LoginBtn from '../components/common/LoginBtn';
import logo from '../assets/logo.png';

const Header = () => {
  const nav = useNavigate();
  const token = useAuthStore((state) => state.token); // 토큰 값 가져오기
  const name = localStorage.getItem('name');

  const handleLogoClick = () => {
    nav(`/`);
  };

  return (
    <div
      className="flex justify-between m-1 items-center mb-4"
      style={{ width: '100%' }}
    >
      {/* 부모 컨테이너를 전체 너비로 설정 */}
      {/* 로고 */}
      <button onClick={handleLogoClick} className="w-52">
        <img src={logo} alt="ukids-logo" width="230" />
      </button>
      {/* 로그인이 안되었으면 로그인/회원가입 버튼*/}
      {/* 로그인 완료 시 프로필 버튼 */}
      {/* 로그인 상태에 따른 조건부 렌더링 */}
      {!token ? ( // 토큰X -> 로그인X
        <LoginBtn />
      ) : (
        //토큰 O -> 로그인 O
        <ProfileBtn
          name={name || '이삼성'}
          hasFamily={false}
          isManager={true}
        />
      )}
    </div>
  );
};

export default Header;
