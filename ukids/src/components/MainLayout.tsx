// 메인 레이아웃
import React from 'react';
import Header from './Header';
// 메뉴바
import Footer from './Footer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      {/* 메뉴바 */}
      {/* 컨텐츠 */}
      <Footer />
    </>
  );
};

export default MainLayout;
