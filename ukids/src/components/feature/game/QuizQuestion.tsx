import { useState } from 'react';
import './game.css';

const QuizQuestion = () => {
  const [text, setText] = useState('');
  const onClick = () => {
    setText('');
  };

  return (
    <>
      <div className="feature-box">
        {/*상단 */}
        <div>
          <h1>질문목록</h1>
        </div>

        {/* 질문 목록 */}
        <div>
          <table></table>
        </div>

        {/* 버튼 */}
        <div>
          <form action="" method="post">
            <label htmlFor="question">질문</label>
            <input type="text" value={text} name="question" id="question" />
          </form>

          <button className="" onClick={onClick}>
            초기화
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizQuestion;
