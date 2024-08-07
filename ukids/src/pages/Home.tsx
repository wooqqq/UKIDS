import BlueButton from '../components/common/BlueButton';
import RedButton from '../components/common/RedButton';
import tree from '../assets/plant-9783172-7934120.png';

const Home = () => {
  // 비로그인 -> 기본 페이지 Home
  return (
    <>
      <h1>홈페이지</h1>
      <RedButton name="로그인" path="/login" />
      <BlueButton name="회원가입" path="/join" />
      <div>
        <img src={tree} alt="" className="w-60" />
      </div>
    </>
  );
};

export default Home;
