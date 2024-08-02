// 가족해체(red, big) 등 부정
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css';

interface RedButtonProps {
  name: string;
  path: string;
}

const RedButton: React.FC<RedButtonProps> = ({ name, path }) => {
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
      <button onClick={handleClick} className="common-btn red-btn">
        {name}
      </button>
    );
  }
};

export default RedButton;
