const Login = () => {
  return (
    <>
      {/* 로그인 박스 */}
      <div>
        <form action="">
          <input type="text" />
          <input type="password" />
          <button>로그인</button>
        </form>
      </div>
      <button>비밀번호 찾기</button>
      <span className="m-1">
        <div className="h-4 w-0.5 bg-gray-400"></div>
      </span>
      <button>아이디 찾기</button>
      <span className="m-1">
        <div className="h-4 w-0.5 bg-gray-400"></div>
      </span>
      <button>회원가입</button>
    </>
  );
};

export default Login;
