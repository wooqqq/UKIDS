import './games.css';

const QuizQnA = () => {
  const questionNum = 1;
  const familyName = '이삼성';
  const secondCounter = 20;

  return (
    <>
      <div className="feature-box flex justify-center flex-col">
        {/* 문제 */}
        <div className="flex justify-center">
          <h1>문제 {questionNum}</h1>
        </div>

        {/* 질문 */}
        <div className="flex justify-center">
          <h3>{familyName}이 가장 좋아하는 과일은?</h3>
        </div>

        {/* 문제 */}
        <div className="flex flex-row justify-evenly">
          <button>1. 딸기</button>
          <button>2. 오렌지</button>
          <button>3. 포도</button>
        </div>

        {/* 타이머 */}
        <div className="flex justify-center">
          <div className="flex justify-center items-center w-[106px] h-[106px] rounded-full border-solid border-8 border-[#36d5f1] text-[#36d5f1]">
            {secondCounter}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
