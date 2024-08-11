import GameButton from './GameButton';
import './gamepart.css';

const QuizQnA = () => {
  return (
    <>
      <div className="feature-box">
        {/* 상단 */}
        <div className="h-[15%] flex justify-center items-center game-font">
          <h1>퀴즈 결과</h1>
        </div>

        {/* 결과 창 */}
        <div className="h-[65%] flex justify-center items-center">
          <div className="w-[45rem] h-[20rem] bg-[#d9d9d9] rounded-[10px]"></div>
        </div>

        {/* 버튼 */}
        <div className="h-[15%] flex flex-row justify-center">
          <GameButton name="결과 기록" path="../history" />
          <GameButton name="메인으로" path="/" />
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
