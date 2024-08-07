import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Letters from './pages/Letters';
import Albums from './pages/Albums';
import PaintingDiary from './pages/PaintingDiary';
import GrowthDiary from './pages/GrowthDiary';
import GameSelect from './pages/GameSelect';
import Quiz from './pages/Quiz';
import CallMyName from './pages/CallMyName';
import FamilyChatting from './pages/FamilyChatting';
import FamilyVideoCall from './pages/FamilyVideoCall';
import Setting from './pages/Setting';
import Notfound from './pages/Notfound';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/common/Sidebar';

// 1. Home "/" : 가장 기본 페이지 (로그인 전, 후 모두 사용)
// 2. Schedule "/schedule" : 일정 관리
// 3. Letters "/letters" : 편지함
// 4. Albums "/albums" : 사진 앨범
// 5. PaintDiary "/paintdiary" : 그림일기
// 6. GrowthDiary "/growthdiary" : 성장일지
// 7. FamilyChatting "/chat" : 가족 채팅방
// 8. FamilyVideoCall "/chat/call" : 가족 통화
//    => 채팅방 내의 통화여서 추후 사라질지도?
// 9. Game "/game" : 게임
// 9-1. QuizGame "/game/quiz" : 가족 퀴즈 게임
// 9-2. CallMyNameGame "/game/callmyname" : 콜마이네임 게임
// 10. Setting "/setting" : 설정 (회원정보, 가족정보 모두 수정(=마이페이지))
// 11. Notfound "/잘못된 주소" : 잘못된 주소 입력 시

const App = () => {
  return (
    <div className="">
      <Header />
      <div className="flex justify-between">
        {/* 로그인 안한 홈, 가족방 생성/찾기는 사이드바X */}
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule/*" element={<Schedule />}></Route>
          <Route path="/letters" element={<Letters />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/paintdiary" element={<PaintingDiary />} />
          <Route path="/growthdiary" element={<GrowthDiary />} />
          <Route path="/chat" element={<FamilyChatting />} />
          <Route path="/chat/call" element={<FamilyVideoCall />} />
          <Route path="/game" element={<GameSelect />}></Route>
          <Route path="/quiz/*" element={<Quiz />}></Route>
          <Route path="/callmyname/*" element={<CallMyName />}></Route>
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
