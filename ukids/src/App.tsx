import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import FamilyChatting from './pages/FamilyChatting';
import FamilyVideoCall from './pages/FamilyVideoCall';
import Schedule from './pages/Schedule';

// 1. Home "/" : 가장 기본 페이지 (로그인 전, 후)
// 2. Albums "/albums" : 사진 앨범
// 3. Schedules "/schedules" : 일정 관리
// 4. GrowthDiary "/growthdiary" : 성장일지
// 5. Letters "/letters" : 편지함

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<MyPage />} />
        <Route path="/chat-room" element={<FamilyChatting />} />
        <Route path="/video-call-room" element={<FamilyVideoCall />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </>
  );
};

export default App;
