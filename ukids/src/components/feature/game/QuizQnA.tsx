import { useEffect, useState } from 'react';
import api from '@/util/api';
import { useNavigate } from 'react-router-dom';
import GamePageHeader from './GamePageHeader';
import './gamepart.css';
import writeAns from '@/assets/write_ans.png';
import deleteAns from '@/assets/delete_ans.png';

const QuizQnA = () => {
  const [num, setNum] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const nav = useNavigate();

  const onClick = () => {
    nav('../question');
  };

  console.log(questionList);

  // 처음 접속 시 질문 목록 불러오기 - 가족방, 유저에 따라 다를 것
  useEffect(() => {
    api
      .get(`/quiz-question`)
      .then((response: any) => {
        console.log(response.data);
        setQuestionList(response.data.QuizQuestions);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="feature-box">
        {/* 헤더 */}
        <div className="h-[15%] flex items-center">
          <GamePageHeader title="질문목록" />
        </div>

        {/* 질문 목록 */}
        <div className="h-[65%] flex justify-evenly overflow-y-auto">
          {questionList.length !== 0 ? (
            <table>
              <tr>
                <th>번호</th>
                <th>질문</th>
                <th>답변</th>
              </tr>
              {questionList.map(
                (value: { question: string; answer: string }) => {
                  setNum((prev) => prev + 1);

                  return (
                    <tr>
                      <td>{num}</td>
                      <td>{value.question}</td>
                      <td>
                        {value.answer !== '' ? value.answer : '답변없음'}
                        {/* 퀴즈 상세 버튼 */}
                        <button>
                          <img src={writeAns} alt="write" />
                        </button>
                        {/* 삭제버튼 */}
                        <button>
                          <img src={deleteAns} alt="delete" />
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </table>
          ) : (
            <div className="flex items-center text-3xl">
              질문이 없습니다...!
            </div>
          )}
        </div>

        {/* 버튼 */}
        <div className="h-[15%] flex justify-center">
          <button onClick={onClick} className="game-btn-quiz-y game-btn-common">
            퀴즈 더 내러가기
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
