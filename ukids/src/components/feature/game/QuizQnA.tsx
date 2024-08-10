import { useEffect, useState } from 'react';
import api from '@/util/api';
import { useNavigate } from 'react-router-dom';
import './gamepart.css';

const QuizQnA = () => {
  const [num, setNum] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const nav = useNavigate();

  const onClick = () => {
    nav('../question');
  };

  // 처음 접속 시 질문 목록 불러오기 - 가족방, 유저에 따라 다를 것
  useEffect(() => {
    api
      .get(`/quiz-question`)
      .then((response: any) => {
        console.log(response.data.QuizQuestions);
        setQuestionList(response.data.QuizQuestions);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="feature-box">
        {/*상단 */}
        <div>
          <h1>질문목록</h1>
        </div>

        {/* 질문 목록 */}
        <div>
          {questionList ? (
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
                        {value.answer ? value.answer : '답변없음'}
                        {/* 수정버튼 */}
                        {/* 삭제버튼 */}
                      </td>
                    </tr>
                  );
                },
              )}
            </table>
          ) : (
            <div className="text-3xl">질문이 없습니다...!</div>
          )}
        </div>

        {/* 버튼 */}
        <div>
          <button
            onClick={onClick}
            className="rounded-md game-btn-quiz game-btn-common common-btn"
          >
            퀴즈 더 내러가기
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
