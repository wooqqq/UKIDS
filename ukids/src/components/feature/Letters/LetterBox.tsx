// 메인에 보여질 편지함 컴포넌트

import { useNavigate } from 'react-router-dom';

interface letterBoxProps {
  path: string;
}
const LetterBox = ({ path }: letterBoxProps) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(path);
  };

  return (
    <button onClick={handleClick} type="button" className="w-[100%] h-[100%]">
      <div className="title-style">편지함</div>
      <section>
        <div>안 읽은 편지 / 받은 편지</div>
        <div>{/* 안읽은 편지 수 / 받은 편지 수 */}0 / 20</div>
      </section>
    </button>
  );
};

export default LetterBox;
