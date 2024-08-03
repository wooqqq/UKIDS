import { useNavigate } from 'react-router-dom';
import './button.css';

interface BlueButtonProps {
  name: string;
  path: string;
}

const BlueButton = (BlueButtonProps: BlueButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(BlueButtonProps.path);
  };
  if (BlueButtonProps.name == '연결하기') {
    return (
      <button onClick={handleClick} className="common-btn green-btn">
        {BlueButtonProps.name}
      </button>
    );
  } else {
    return (
      <button onClick={handleClick} className="common-btn blue-btn">
        {BlueButtonProps.name}
      </button>
    );
  }
};

export default BlueButton;
