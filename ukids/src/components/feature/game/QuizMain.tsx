import { useNavigate } from 'react-router-dom';
import './gamepart.css';

const QuizMain = () => {
  const nav = useNavigate();

  const onClickStart = () => {
    // 준비방으로 이동
    nav('ready');
  };
  const onClickQnAList = () => {
    // 질문 목록으로 이동
    nav('qna');
  };
  const onClickHistory = () => {
    // 결과 기록으로 이동
    nav('history');
  };

  return (
    <>
      <div className="flex justify-evenly items-center w-full">
        <button className="quiz-select-box" onClick={onClickStart}>
          퀴즈 시작
        </button>
        <button className="quiz-select-box" onClick={onClickQnAList}>
          질문 목록
        </button>
        <button className="quiz-select-box" onClick={onClickHistory}>
          결과 기록
        </button>
      </div>
    </>
  );
};

export default QuizMain;
