import Footer from '../components/Footer';
import Header from '../components/Header';
import FeatureBox from '../components/common/FeatureBox';

const Home = () => {
  // const API_KEY = import.meta.env.VITE_API_KEY;

  return (
    <>
      <Header />
      <div className="main-layout">
        {/* 메뉴바 */}

        {/* 콘텐츠 */}
        <FeatureBox />
      </div>
      <Footer />

      {/* <GrayButton name="가족대화방" path="/chat-room" />
      <GrayButton name="마이페이지" path="/user" />
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
      <ProfileList /> */}
    </>
  );
};

export default Home;
