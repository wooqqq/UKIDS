import { useState } from 'react';
import GameButton from './GameButton';
import FamilyMemberList from '../family/FamilyMemberList';
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
        <div className="flex flex-col w-3/4 justify-center items-center">
          {/* 제목 */}
          <div className="flex flex-row">
            <span>가족 퀴즈 준비</span>
            <img src="" alt="설명" />
          </div>

          {/* 문제 개수 정하기 */}
          <div className="flex flex-row">
            <span>1인 출제 문제 개수 </span>
            <select name="quizCnt" id="num">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* 퀴즈 예시 */}
          <div className="w-[499px] h-[249px] bg-[#d9d9d9] rounded-[10px]"></div>

          {/*  버튼 */}
          <div className="flex flex-row">
            {!isReady ? (
              <>
                <GameButton name="돌아가기" path="../" />
                <button
                  onClick={handleClick}
                  className="rounded-md game-btn-quiz game-btn-common common-btn"
                >
                  준비 완료!
                </button>
              </>
            ) : (
              <button
                onClick={handleClick}
                className="rounded-md gray-btn game-btn-common common-btn"
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
