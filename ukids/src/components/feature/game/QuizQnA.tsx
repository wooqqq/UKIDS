import { useEffect, useState } from 'react';
import api from '@/util/api';
import { useNavigate } from 'react-router-dom';
import GamePageHeader from './GamePageHeader';
import './gamepart.css';
import writeAns from '@/assets/write_ans.png';
import deleteAns from '@/assets/delete_ans.png';

interface Question {
  quizQuestionId: number;
  question: string;
  answer: string;
  quizType: string;
}

const QuizQnA = () => {
  const [questionList, setQuestionList] = useState([]);
  const nav = useNavigate();

  const onClick = () => {
    nav('../question');
  };

  const handleWriteAns = () => {};

  const handleDeleteAns = (quizQuestionId: number) => {
    api
      .delete(`/quiz-question/${quizQuestionId}`)
      .then(console.log('퀴즈 삭제 완료!'));
  };

  // 처음 접속 시 질문 목록 불러오기 - 가족방, 유저에 따라 다를 것
  useEffect(() => {
    api
      .get(`/quiz-question`)
      .then((response: any) => {
        setQuestionList(response.data.results.QuizQuestions);
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
              {questionList.map((question: Question) => {
                return (
                  <tr>
                    <td>{question.quizQuestionId}</td>
                    <td>{question.question}</td>
                    <td>
                      {question.quizType}
                      {question.answer
                        ? '답변을 작성해주세요!'
                        : question.answer}
                      {/* 퀴즈 상세 버튼 */}
                      {/* 질문 타입에 따라 답변 작성도 달라져야하는데... */}
                      <button
                        onClick={() => {
                          handleWriteAns();
                        }}
                      >
                        <img src={writeAns} alt="write" />
                      </button>
                      {/* 삭제버튼 */}
                      <button
                        onClick={() => {
                          handleDeleteAns(question.quizQuestionId);
                        }}
                      >
                        <img src={deleteAns} alt="delete" />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
