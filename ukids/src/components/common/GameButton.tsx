import { useNavigate } from 'react-router-dom';
import './button.css';

interface GameButtonProps {
  name: string;
  path: string;
}

const GameButton = (props: GameButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.path);
  };

  const nameArray = ['돌아가기', '준비 취소', '초기화'];

  const checkGray = () => {
    for (let i = 0; i < nameArray.length; i++) {
      if (nameArray[i] == props.name) {
        return true;
      }
    }
    return false;
  };

  if (checkGray()) {
    return (
      <button
        onClick={handleClick}
        className="rounded-md gray-btn game-btn-common common-btn"
      >
        {props.name}
      </button>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        className="rounded-md game-btn-quiz game-btn-common common-btn"
      >
        {props.name}
      </button>
    );
  }
};

export default GameButton;
