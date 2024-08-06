const UserJoin = () => {
  return (
    <>
      {/* 회원가입 박스 */}
      <div>
        <form>
          <div>
            <input type="text" placeholder="아이디" />
          </div>
          <div>
            <input type="password" placeholder="비밀번호 입력" />
          </div>
          <div>
            <input type="password" placeholder="비밀번호 확인" />
          </div>
        </form>
      </div>
      <button className="text-gray-400"></button>
    </>
  );
};

export default UserJoin;
