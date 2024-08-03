import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileBtn from './common/ProfileButton';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <div className="flex justify-start m-1 items-center" style={{ width: '100%' }}> {/* 부모 컨테이너를 전체 너비로 설정 */}
      {/* 로고 */}
      <button onClick={handleClick} className="w-52">
        <img src="../../assets/logo.png" alt="ukids-logo" width="230" />
      </button>
      {/* 고정 너비의 빈 공간 */}
      <div style={{ width: '890px' }}></div> {/* 로고와 버튼 사이 1200px 공간 추가 */}
      {/* 프로필 버튼 */}
      <ProfileBtn name="이삼성" hasFamily={true} isManager={true} />
    </div>
  );
};

export default Header;
