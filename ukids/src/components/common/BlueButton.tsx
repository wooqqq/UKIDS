// 가족채팅방 연결하기 이미지 추가
import { useNavigate } from 'react-router-dom';
import './button.css';

interface BlueButtonProps {
  name: string;
  path: string;
}

const BlueButton = ({ name, path }: BlueButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  if (name == '연결하기') {
    return (
      <button onClick={handleClick} className="common-btn green-btn">
        <img src="/assets/subway_call-2.png" alt="call-icon" />
        {name}
      </button>
    );
  } else {
    return (
      <button onClick={handleClick} className="common-btn blue-btn">
        {name}
      </button>
    );
  }
};

export default BlueButton;
