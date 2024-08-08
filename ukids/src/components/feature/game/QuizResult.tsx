import GameButton from '../../common/GameButton';
import './gamebutton.css';

const QuizQnA = () => {
  return (
    <>
      <div className="feature-box flex flex-col justify-center">
        {/* 퀴즈 결과 */}
        <div className="flex justify-center">
          <h1>퀴즈 결과</h1>
        </div>

        {/* 결과 창 */}
        <div className="flex justify-center">
          <div className="w-[499px] h-[249px] bg-[#d9d9d9] rounded-[10px]"></div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-row justify-around">
          <GameButton name="결과 기록" path="../history" />
          <GameButton name="메인으로" path="../../" />
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
