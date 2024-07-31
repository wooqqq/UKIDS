import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import FamilyChatting from './pages/FamilyChatting';
import FamilyVideoCall from './pages/FamilyVideoCall';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<MyPage />} />
        <Route path="/chat-room" element={<FamilyChatting />} />
        <Route path="/video-call-room" element={<FamilyVideoCall />} />
      </Routes>
    </>
  );
};

export default App;
