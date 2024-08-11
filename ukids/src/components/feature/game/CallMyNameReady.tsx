import { useState } from 'react';
import CallMyNameButton from './CallMyNameButton';
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
            <span className="flex items-center game-font callmyname-font-color">
              콜마이네임 준비
            </span>
            <button className="m-4">
              <img src={gameExplain} alt="설명" />
            </button>
          </div>

          {/* 가운데 영역 */}
          <div className="h-[65%] flex flex-col justify-center">
            {/* 퀴즈 예시 */}
            <div className="m-4">
              <div className="w-[499px] h-[249px] bg-[#d9d9d9] rounded-[10px]"></div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="h-[15%] flex flex-row p-4">
            {!isReady ? (
              <>
                <CallMyNameButton name="돌아가기" path="../" />
                <button
                  onClick={handleClick}
                  className="game-btn-callmyname game-btn-common"
                >
                  준비 완료!
                </button>
              </>
            ) : (
              <button
                onClick={handleClick}
                className="game-btn-g game-btn-common"
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
