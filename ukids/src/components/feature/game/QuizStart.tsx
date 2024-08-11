import { useEffect, useState } from 'react';
import './gamepart.css';
import { useVideoCallStore } from '@stores/videoCallStore';
import { useAuthStore } from '@stores/authStore';

const QuizQnA = () => {
  const {} = useVideoCallStore();
  const {} = useAuthStore();

  const [questionNum, setQuestionNum] = useState(1);
  const [counter, setCounter] = useState(20);
  const familyName = '이삼성';

  useEffect(() => {}, []);

  return (
    <>
      <div className="feature-box flex justify-center flex-col">
        {/* 문제 */}
        <div className="h-[15%] flex justify-center game-font quiz-font-color">
          <p>문제 {questionNum}</p>
        </div>

        {/* 질문 */}
        <div className="h-[60%]">
          <div className="h-[30%] flex justify-center items-center text-4xl font-[ONE-MOBILE-POP]">
            <h3>Q. {familyName}이(가) 가장 좋아하는 과일은?</h3>
          </div>

          {/* 문제 */}
          <div className="h-[50%] flex flex-row justify-evenly flex-wrap font-[ONE-MOBILE-POP]">
            <button>1. 딸기</button>
            <button>2. 오렌지</button>
            <button>3. 포도</button>
          </div>
        </div>

        {/* 타이머 */}
        <div className="h-[20%] flex justify-center">
          <div className="flex justify-center items-center w-[106px] h-[106px] rounded-full border-solid border-8 border-[#36d5f1]">
            <div className="text-[#36d5f1] text-3xl font-[ONE-MOBILE-POP]">
              {counter}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
