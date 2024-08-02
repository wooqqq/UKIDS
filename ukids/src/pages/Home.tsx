import MainLayout from '../components/MainLayout';
import BlueButton from '../components/common/BlueButton';
import CharacterTag from '../components/common/CharaterTag';
import FeatureBox from '../components/common/FeatureBox';
import GrayButton from '../components/common/GrayButton';
import RedButton from '../components/common/RedButton';
import WhiteButton from '../components/common/WhiteButton';

const Home = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const num: number = 1234;

  return (
    <>
      <MainLayout />
      {/* <div className="text-3xl text-blue-500">Hello World!</div>
      <div>{API_KEY}</div>
      <div>{num}</div> */}
      {/* <GrayButton name="마이페이지" path="/user" />
      <GrayButton name="가족대화방" path="/chat-room" />
      <GrayButton name="로그아웃" path="/" />
      <BlueButton name="편지쓰기" path="/letters/write" />
      <RedButton name="가족해체" path="/info" />
      <BlueButton name="연결하기" path="/chat/call" />
      <WhiteButton name="삭제" path="/albums/list" />
      <WhiteButton name="목록" path="/albums/list" />
      <CharacterTag character="엄마" />
      <CharacterTag character="아빠" />
      <CharacterTag character="딸" />
      <CharacterTag character="아들" />
      <CharacterTag character="할머니" />
      <CharacterTag character="할아버지" />
      <CharacterTag character="손자" />
      <CharacterTag character="손녀" />
      <FeatureBox /> */}
    </>
  );
};

export default Home;
