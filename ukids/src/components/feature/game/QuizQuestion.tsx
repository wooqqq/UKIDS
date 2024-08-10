import { useState } from 'react';
import './gamepart.css';
import GamePageHeader from './GamePageHeader';

const QuizQuestion = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const onSubmit = () => {
    // 데이터 가공 및 등록요청 날리기
  };

  return (
    <>
      <div className="feature-box h-full">
        {/* 헤더 */}
        <div className="h-[15%] flex items-center">
          <GamePageHeader title="퀴즈 등록" />
        </div>

        {/* 본문 영역 */}
        <div className="h-[65%] flex flex-col justify-center items-center">
          <div className="text-4xl">
            <form onSubmit={onSubmit}>
              <div className="m-4">
                <label htmlFor="question">질문 </label>
                <input
                  type="text"
                  value={question}
                  name="question"
                  id="question"
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </div>
              <div className="m-4">
                <label htmlFor="question">답변 </label>
                <input
                  type="text"
                  value={answer}
                  name="question"
                  id="question"
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <div className="m-4">
                <input
                  type="checkbox"
                  id="sameQuestion"
                  name="sameQuestion"
                  className="w-8 h-8 m-2"
                />
                <label htmlFor="sameQuestion" className="m-2">
                  가족들에게도 같은 질문하기
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="h-[15%] flex justify-center p-4">
          <button
            className="game-btn-common game-btn-quiz"
            onClick={() => {
              setQuestion('');
              setAnswer('');
            }}
          >
            초기화
          </button>
          <button className="game-btn-common game-btn-quiz" type="submit">
            등록하기
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizQuestion;
