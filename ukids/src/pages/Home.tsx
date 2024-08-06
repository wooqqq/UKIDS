import WhiteButton from '../components/common/WhiteButton';
import RedButton from '../components/common/RedButton';
import BlueButton from '../components/common/BlueButton';

const Home = () => {
  // 비로그인 -> 기본 페이지
  // 로그인 성공 -> 가족 페이지
  // 홈과 메인을 나눌지? -> 나눠야지?
  return (
    <>
      <h1>홈페이지</h1>
      <div>
        <WhiteButton name="일정관리" path="/schedule" />
        <RedButton name="로그인" path="/login" />
        <BlueButton name="회원가입" path="/join" />
      </div>
    </>
  );
};

export default Home;
