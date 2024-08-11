import { useEffect, useState } from 'react';
import api from '@/util/api';
import { useNavigate } from 'react-router-dom';
import GamePageHeader from './GamePageHeader';
import './gamepart.css';

import writeAns from '@/assets/write_ans.png';
import deleteAns from '@/assets/delete_ans.png';
import checkIcon from '@/assets/game_checkbox.png';

interface Question {
  quizQuestionId: number;
  question: string;
  answer: string;
  quizType: string;
}

const QuizQnA = () => {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>('');

  // 페이지 이동
  const nav = useNavigate();
  const onClick = () => {
    nav('../question');
  };

  // 답변 수정한거 서버로 보내고 리스트 갱신
  const editSubmit = (quizQuestion: any) => {
    console.log(quizQuestion);
    console.log(answer);
    api
      .put('/quiz-question', {
        quizQuestionId: quizQuestion.quizQuestionId,
        question: quizQuestion.question,
        answer: answer,
        quizType: 'MULTIPLE_CHOICE',
      })
      .then(() => {
        loadingQuestionList();
        setIsEditing(null); // 편집 모드 종료
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  // 답변 핸들러
  const handleWriteAns = (question: Question) => {
    setIsEditing(question.quizQuestionId); // 현재 편집 중인 질문 ID 설정
    setAnswer(question.answer || ''); // 기존 답변을 state에 저장

    if (question.quizType === 'OX') {
      // 퀴즈타입이 OX일 때는 OX 버튼 선택
    }
  };

  // 질문목록 불러오기
  const loadingQuestionList = async () => {
    api
      .get(`/quiz-question`)
      .then((response: any) => {
        setQuestionList(response.data.result.quizQuestions);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  // 질문 삭제
  const handleDeleteQuestion = (quizQuestionId: number) => {
    api.delete(`/quiz-question/${quizQuestionId}`).then(loadingQuestionList());
  };

  // 처음 접속 시 질문 목록 불러오기
  useEffect(() => {
    loadingQuestionList();
  }, []);

  return (
    <>
      <div className="feature-box">
        {/* 헤더 */}
        <div className="h-[15%] flex items-center">
          <GamePageHeader title="질문목록" />
        </div>

        {/* 질문 목록 */}
        <div className="h-[65%] overflow-y-auto flex justify-center">
          {questionList.length !== 0 ? (
            <table className="w-[80%]">
              <thead>
                <tr className="border-solid border-b-4 border-[#777777] py-2">
                  <th className="w-[20%] text-center">번호</th>
                  <th className="w-[40%] text-center">질문</th>
                  <th className="w-[40%] text-center">답변</th>
                </tr>
              </thead>
              {/* <tbody> */}
              {questionList.map((question: Question, index) => {
                return (
                  <tr key={question.quizQuestionId}>
                    <td className="w-[20%] text-center py-2">{index + 1}</td>
                    <td className="w-[40%] text-center py-2">
                      {question.question}
                    </td>
                    <td className="w-[40%] flex flex-row justify-center items-center py-2">
                      {isEditing === question.quizQuestionId ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            editSubmit(question);
                          }}
                          className="flex items-center"
                        >
                          {question.quizType === 'OX' ? (
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => setAnswer('O')}
                                className={`${
                                  answer === 'O' ? 'selected' : ''
                                } px-4 py-2`}
                              >
                                O
                              </button>
                              <button
                                type="button"
                                onClick={() => setAnswer('X')}
                                className={`${
                                  answer === 'X' ? 'selected' : ''
                                } px-4 py-2`}
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded"
                            />
                          )}
                          <button type="submit" className="ml-2">
                            <img src={checkIcon} alt="submit" />
                          </button>
                        </form>
                      ) : (
                        <>
                          <span className="flex-1 text-center">
                            {question.answer}
                          </span>
                          <button onClick={() => handleWriteAns(question)}>
                            <img src={writeAns} alt="edit" />
                          </button>
                        </>
                      )}
                      {/* 질문 삭제 버튼 */}
                      <button
                        onClick={() =>
                          handleDeleteQuestion(question.quizQuestionId)
                        }
                        className="ml-2"
                      >
                        <img src={deleteAns} alt="delete" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {/* </tbody> */}
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
