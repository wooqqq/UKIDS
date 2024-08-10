import GameButton from './GameButton';
import GamePageHeader from './GamePageHeader';
import './gamepart.css';

const QuizHistory = () => {
  // 게임 기록 가져오기
  const historyList = [];

  return (
    <>
      <div className="feature-box h-full">
        {/* 헤더 */}
        <div className="h-[15%] flex items-center">
          <GamePageHeader title="게임 결과 기록" />
        </div>

        {/* 본문 영역 */}
        <div className="h-[65%] flex justify-center items-center overflow-y-auto">
          {historyList.length !== 0 ? (
            <table>
              <tr>
                <th>회차</th>
                <th>날짜</th>
                <th>우승자</th>
                <th>맞은 개수 / 문제 수</th>
              </tr>
              {
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              }
            </table>
          ) : (
            <div className="text-3xl">게임 기록이 없습니다!</div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="h-[15%] flex justify-center p-4">
          <GameButton name="메인으로" path="/game" />
        </div>
      </div>
    </>
  );
};

export default QuizHistory;
