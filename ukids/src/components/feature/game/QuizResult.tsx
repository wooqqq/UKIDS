import { useEffect } from 'react';
import QuizButton from './QuizButton';
import './gamepart.css';

const QuizQnA = () => {
  // 게임 결과 가져오기

  useEffect(() => {});

  return (
    <>
      <div className="feature-box">
        {/* 상단 */}
        <div className="h-[15%] flex justify-center items-center game-font quiz-font-color">
          <h1>퀴즈 결과</h1>
        </div>

        {/* 결과 창 */}
        <div className="h-[65%] flex justify-center items-center">
          <div className="w-[45rem] h-[20rem] bg-[#d9d9d9] rounded-[10px]"></div>
        </div>

        {/* 버튼 */}
        <div className="h-[15%] flex flex-row justify-center">
          <QuizButton name="결과 기록" path="../history" />
          <QuizButton name="메인으로" path="/game" />
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
