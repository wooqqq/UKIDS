import { useState } from 'react';
import GameButton from './GameButton';
import FamilyMemberList from '../family/FamilyMemberList';
import gameExplain from '@/assets/game_explain.png';
import './gamepart.css';

const QuizReady = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const handleClick = () => {
    setIsReady((prev) => !prev);
  };

  return (
    <>
      <div className="feature-box flex h-full">
        {/* 왼쪽 영역 */}
        <div className="w-3/4 flex flex-col justify-center items-center">
          {/* 제목 */}
          <div className="h-[15%] flex flex-row">
            <span className="flex items-center text-5xl">가족 퀴즈 준비</span>
            <button className="">
              <img src={gameExplain} alt="설명" />
            </button>
          </div>

          {/* 가운데 영역 */}
          <div className="h-[65%] flex flex-col justify-center">
            {/* 문제 개수 정하기 */}
            <div className="flex justify-center">
              <span>1인 출제 문제 개수 </span>
              <select name="quizCnt" id="num">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <span>개</span>
            </div>

            {/* 퀴즈 예시 */}
            <div className="m-4">
              <div className="w-[499px] h-[249px] bg-[#d9d9d9] rounded-[10px]"></div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="h-[15%] flex flex-row p-4">
            {!isReady ? (
              <>
                <GameButton name="돌아가기" path="../" />
                <button
                  onClick={handleClick}
                  className="game-btn-quiz-y game-btn-common"
                >
                  준비 완료!
                </button>
              </>
            ) : (
              <button
                onClick={handleClick}
                className="game-btn-quiz-g game-btn-common"
              >
                준비 취소
              </button>
            )}
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <FamilyMemberList isChattingRoom={false} />
      </div>
    </>
  );
};

export default QuizReady;
