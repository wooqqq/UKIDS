import './user.css';

const UserLogin = () => {
  return (
    <>
      {/* 로그인 박스 */}
      <div className="feature-box">
        <form>
          <div>
            <input type="text" placeholder="아이디" className="login-id-box" />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              className="login-pw-box"
            />
          </div>
          <button>로그인</button>
        </form>
      </div>
      <button className="text-gray-400">비밀번호 찾기</button>
      <span className="m-1">
        <div className="h-4 w-0.5 bg-gray-400"></div>
      </span>
      <button className="text-gray-400">아이디 찾기</button>
      <span className="m-1">
        <div className="h-4 w-0.5 bg-gray-400"></div>
      </span>
      <button className="text-gray-400">회원가입</button>
    </>
  );
};

export default UserLogin;
