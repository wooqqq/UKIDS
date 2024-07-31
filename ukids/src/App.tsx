import React from 'react';
import GrayButton from './components/common/GrayButton';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
      <GrayButton name="Go to MyPage" path="/myPage" />
    </>
  );
}

export default App;
