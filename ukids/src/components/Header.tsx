import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileBtn from './common/ProfileButton';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const handleClick = () => {
    navigate(`/`);
  };

  // 로그인 정보 한 번만 가져오기
  useEffect(() => {
    // if 사용해서 로그인 토큰 있는지 확인
    setIsLogin(true);
  }, []);

  return (
    <div className="flex justify-between m-1">
      {/* 로고 */}
      <button onClick={handleClick} className="w-52">
        <img src="../../src/assets/logo.png" alt="ukids-logo" width="230" />
      </button>
      <ProfileBtn name="이삼성" hasFamily={true} isManager={true} />
      {/* 로그인 영역 */}
      {/* <div>
        {isLogin ? (
          // 로그인이 확인되지 않았을 때
          <div hidden={isLogin}>로그인/회원가입</div>
        ) : (
          // 로그인이 확인되었을 때 -> 이름, 가족방 정보도 띄워야함...
          <div hidden={!isLogin}>로그인되었습니다!</div>
        )}
      </div> */}
    </div>
  );
};

export default Header;
