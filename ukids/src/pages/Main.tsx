import BlueButton from '../components/common/BlueButton';
import RedButton from '../components/common/RedButton';
import WhiteButton from '../components/common/WhiteButton';

const Main = () => {
  return (
    <div>
      <div>
        <WhiteButton name="일정관리" path="/schedule" />
        <RedButton name="로그인" path="/login" />
        <BlueButton name="회원가입" path="/join" />
      </div>
    </div>
  );
};

export default Main;
