// 가족해체(red, big) 등 부정
// 가족채팅방 연결끊기 이미지 추가
import { useNavigate } from 'react-router-dom';
import './button.css';

interface RedButtonProps {
  name: string;
  path: string;
}

const RedButton = ({ name, path }: RedButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button onClick={handleClick} className="common-btn red-btn">
      {name == '연결끊기' ? (
        <img src="/assets/subway_call-3.png" alt="call-icon" />
      ) : null}
      {name}
    </button>
  );
};

export default RedButton;
