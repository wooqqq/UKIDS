import { useEffect, useState } from 'react';
import GameButton from './GameButton';
import GamePageHeader from './GamePageHeader';
import './gamepart.css';
import api from '../../../util/api';

interface History {
  correctCounts: number;
  totalCounts: number;
  rank: number;
  date: string;
  familyId: number;
  familyName: string;
  familyRepresentative: string;
}

const QuizHistory = () => {
  const [num, setNum] = useState(0);
  const [historyList, setHistoryList] = useState([]);

  // 게임 기록 가져오기
  useEffect(() => {
    api.get('/quiz').then((response) => {
      setHistoryList(response.data.result.quizResults);
    });
  }, []);

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
            historyList.map((history: History) => {
              setNum((prev) => prev + 1);

              return (
                <table>
                  <tr>
                    <th>번호</th>
                    <th>날짜</th>
                    <th>우승자</th>
                    <th>맞은 개수 / 문제 수</th>
                  </tr>
                  {
                    <tr>
                      <th>{num}</th>
                      <th>{history.date}</th>
                      <th>{history.familyRepresentative}</th>
                      <th>
                        {history.correctCounts} / {history.totalCounts}
                      </th>
                    </tr>
                  }
                </table>
              );
            })
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
