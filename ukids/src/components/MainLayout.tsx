// 메인 레이아웃
import React from 'react';
import Header from './Header';
// 메뉴바
import Footer from './Footer';
import GrayButton from './common/GrayButton';
import BlueButton from './common/BlueButton';
import RedButton from './common/RedButton';
import WhiteButton from './common/WhiteButton';
import CharacterTag from './common/CharaterTag';
import FeatureBox from './common/FeatureBox';
import ProfileList from './common/ProfileList';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      {/* 메뉴바 */}
      {/* 컨텐츠 */}
      {/* <GrayButton name="가족대화방" path="/chat-room" /> */}
      {/* <GrayButton name="마이페이지" path="/user" />
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
      <CharacterTag character="손녀" /> */}
      <div>
        <FeatureBox />
      </div>
      {/* <ProfileList /> */}
      <Footer />
    </>
  );
};

export default MainLayout;
