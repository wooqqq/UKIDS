import { useNavigate } from 'react-router-dom';
import '../../common/common.css';

const PaintPreBox = () => {
  const nav = useNavigate();
  const onClickButton = () => {
    // 그림일기 페이지로 이동
    nav('/paintdiary');
  };
  return (
    <button className="half-pre-box" onClick={onClickButton}>
      <div>그림일기</div>
      <div>
        <img src="#" alt="그림일기 이미지" />
        <button>그림일기 페이지 이동</button>
      </div>
    </button>
  );
};

export default PaintPreBox;
