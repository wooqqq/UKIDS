import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css';

interface BlueButtonProps {
  name: string;
  path: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({ name, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  if (name == '연결하기') {
    return (
      <button onClick={handleClick} className="common-btn green-btn">
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
