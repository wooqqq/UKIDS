// 가족해체(red, big) 등 부정
import { useNavigate } from 'react-router-dom';
import './button.css';

interface RedButtonProps {
  name: string;
  path: string;
}

const RedButton = (RedButtonProps: RedButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RedButtonProps.path);
  };
  if (RedButtonProps.name == '연결하기') {
    return (
      <button onClick={handleClick} className="common-btn green-btn">
        {RedButtonProps.name}
      </button>
    );
  } else {
    return (
      <button onClick={handleClick} className="common-btn red-btn">
        {RedButtonProps.name}
      </button>
    );
  }
};

export default RedButton;
