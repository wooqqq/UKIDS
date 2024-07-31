import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex place-content-between m-1">
      {/* 로고 */}
      <button onClick={handleClick}>
        <img src="./assets/logo.png" alt="ukids-logo" />
      </button>

      {/* 로그인 영역 */}
      <div>
        {isLogin ? (
          // 로그인이 확인되지 않았을 때
          <div hidden={isLogin}>로그인/회원가입</div>
        ) : (
          // 로그인이 확인되었을 때 -> 이름, 가족방 정보도 띄워야함...
          <div hidden={!isLogin}>로그인되었습니다!</div>
        )}
      </div>
    </div>
  );
};

export default Header;
