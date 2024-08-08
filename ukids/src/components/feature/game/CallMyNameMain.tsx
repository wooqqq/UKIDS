import { useNavigate } from 'react-router-dom';
import './games.css';

const CallMyNameMain = () => {
  const nav = useNavigate();

  const onClickStart = () => {
    // 준비방으로 이동
    nav('./ready');
  };
  const onClickHistory = () => {
    // 결과 기록으로 이동
    nav('./history');
  };

  return (
    <>
      <div className="flex justify-evenly items-center w-full">
        <button className="callmyname-select-box" onClick={onClickStart}>
          게임시작
        </button>
        <button className="callmyname-select-box" onClick={onClickHistory}>
          결과기록
        </button>
      </div>
    </>
  );
};

export default CallMyNameMain;
