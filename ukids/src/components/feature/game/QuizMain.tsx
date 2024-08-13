// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameBackButton from './GameBackButton';
// import gameExplain from '@/assets/game_explain.png';
import './gamepart.css';

const QuizMain = () => {
  const nav = useNavigate();
  // const [isHover, setIsHover] = useState(false);

  const onClickStart = () => {
    // 준비방으로 이동
    nav('ready');
  };
  const onClickQnAList = () => {
    // 질문 목록으로 이동
    nav('qna');
  };
  const onClickHistory = () => {
    // 결과 기록으로 이동
    nav('history');
  };

  // hover:border-solid border-8 border-[#FFBF33]

  return (
    <>
      <div className="w-[80%] flex flex-col justify-between">
        {/* 빈 div */}
        <div className="h-[1rem]"></div>

        {/* 윗 부분 */}
        <div className="flex flex-row justify-between">
          <GameBackButton path={'/game'} />
          {/* <img
            src={gameExplain}
            alt="설명"
            // className={isHover && 'className'}
          />
          <div className="relative">
            <div className="flex items-center gap-5">
              <div className="inline-block profile-name">{name}</div>
              <button onClick={handleClick} className="profile-btn">
                <div>'가족방을 만들어보세요!'</div>
                <div className="fill-black">▼</div>
              </button>
            </div>
          </div> */}
        </div>

        {/* 본 영역 */}
        <div className="flex justify-between items-center w-full px-4">
          <button
            className="quiz-select-box game-font quiz-font-color"
            onClick={onClickStart}
          >
            퀴즈 시작
          </button>
          <button
            className="quiz-select-box game-font quiz-font-color"
            onClick={onClickQnAList}
          >
            질문 목록
          </button>
          <button
            className="quiz-select-box game-font quiz-font-color"
            onClick={onClickHistory}
          >
            결과 기록
          </button>
        </div>
        {/* 빈 div */}
        <div className="h-[8rem]"></div>
      </div>
    </>
  );
};

export default QuizMain;
