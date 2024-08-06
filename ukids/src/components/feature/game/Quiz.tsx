import { Routes, Route } from 'react-router-dom';
import QuizReady from './QuizReady';
import QuizMain from './QuizMain';

const Quiz = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<QuizMain />} />
        <Route path="ready" element={<QuizReady />} />
        {/* <Route path="start" element={<QuizReady />} /> */}
        {/* <Route path="result" element={<QuizReady />} /> */}
      </Routes>
    </>
  );
};

export default Quiz;
