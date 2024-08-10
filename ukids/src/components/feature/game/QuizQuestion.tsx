import { useState } from 'react';
import './gamepart.css';
import GamePageHeader from './GamePageHeader';
import api from '../../../util/api';

const QuizQuestion = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); // 답변 입력 필드의 내용
  const [selectedOption, setSelectedOption] = useState(''); // OX 버튼의 선택 상태 ('O' or 'X')
  const [applyToAll, setApplyToAll] = useState(false); // 체크박스 상태 (가족들에게도 질문할지 여부)

  // 답변 입력 필드 변경 시 호출되는 함수
  const handleAnswerChange = (e: any) => {
    setAnswer(e.target.value); // 입력된 답변을 상태에 저장
    setSelectedOption(''); // OX 버튼 선택 해제
  };

  // OX 버튼 클릭 시 호출되는 함수
  const handleOptionClick = (option: any) => {
    setSelectedOption(option); // O 또는 X 선택 상태 업데이트
    setAnswer(''); // 답변 입력 필드 초기화
  };

  // 체크박스 상태 변경 시 호출되는 함수
  const handleCheckboxChange = (e: any) => {
    setApplyToAll(e.target.checked); // 체크박스 상태 업데이트
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e: any) => {
    console.log('제출');
    e.preventDefault();

    if (!question || (!answer && !selectedOption)) {
      alert('질문과 답변을 입력해주세요!');
      return;
    }

    const quizType = selectedOption ? 'OX' : 'MULTIPLE_CHOICE';

    const data = {
      question,
      answer,
      quizType,
    };

    if (applyToAll) {
      // 가족방에 있는 사람들의 ID를 얻어와서 이 질문 등록 요청
    } else {
      // 내 질문만 업데이트 요청
      api
        .post('/quiz-question', data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <>
      <div className="feature-box h-full">
        {/* 헤더 */}
        <div className="h-[15%] flex items-center">
          <GamePageHeader title="퀴즈 등록" />
        </div>

        {/* 본문 영역 */}
        <div className="h-[80%] flex flex-col justify-center items-center">
          <div className="text-4xl">
            <form onSubmit={handleSubmit}>
              <div className="m-4">
                <label htmlFor="question">질문 </label>
                <input
                  type="text"
                  value={question}
                  name="question"
                  id="question"
                  placeholder="질문을 입력하세요!"
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
                  onChange={handleAnswerChange}
                  placeholder="답변을 입력하세요!"
                />
                <button
                  type="button"
                  onClick={() => handleOptionClick('O')}
                  className={`pl-4 py-2 w-20 rounded-s-full ${
                    selectedOption === 'O'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-600 border-solid border-gray-600'
                  }`}
                >
                  O
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionClick('X')}
                  className={`pr-4 py-2 w-20 rounded-e-full ${
                    selectedOption === 'X'
                      ? 'bg-red-500 text-white'
                      : 'bg-[#777777] text-red-600'
                  }`}
                >
                  X
                </button>
              </div>
              <div className="m-4">
                <input
                  type="checkbox"
                  id="sameQuestion"
                  name="sameQuestion"
                  className="w-8 h-8 m-2"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="sameQuestion" className="m-2">
                  가족들에게도 같은 질문하기
                </label>
              </div>

              {/* 버튼 영역 */}
              <div className="flex justify-center p-4 mt-32">
                <button
                  type="button"
                  className="game-btn-common game-btn-quiz-g"
                  onClick={() => {
                    setQuestion('');
                    setAnswer('');
                    setSelectedOption('');
                  }}
                >
                  초기화
                </button>
                <button
                  className="game-btn-common game-btn-quiz-y"
                  type="submit"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizQuestion;
