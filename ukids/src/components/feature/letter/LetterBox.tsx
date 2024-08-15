// 메인에 보여질 편지함 컴포넌트
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../util/api';

interface letterBoxProps {
  path: string;
}
const LetterBox = ({ path }: letterBoxProps) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(path);
  };

  const [openLetter, setOpneLetter] = useState(-1);
  const [totalLetter, setTotalLetter] = useState(-1);

  // useEffect(() => {
  //   api.get(`letter/to?size=page=`)
  // }, []);

  return (
    <button onClick={handleClick} type="button" className="w-[100%] h-[100%]">
      <div className="title-style">편지함</div>
      <section>
        <div>안 읽은 편지 / 받은 편지</div>
        <div>
          {openLetter} / {totalLetter}
        </div>
      </section>
    </button>
  );
};

export default LetterBox;
