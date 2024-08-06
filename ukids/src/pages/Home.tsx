import { Link } from 'react-router-dom';

const Home = () => {
  // 비로그인 -> 기본 페이지
  // 로그인 성공 -> 가족 페이지
  // 홈과 메인을 나눌지?
  return (
    <>
      <h1>홈페이지</h1>
      <Link to={'/schedule'}>일정관리</Link>
    </>
  );
};

export default Home;
