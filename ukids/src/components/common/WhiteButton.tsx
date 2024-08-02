// 목록
// 삭제 (red text, small)
// 삭제 - 쓰레기통 아이콘
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css';

interface WhiteButtonProps {
  name: string;
  path: string;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ name, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  if (name == '삭제') {
    return (
      <button onClick={handleClick} className="red-font white-btn common-btn">
        {name}
      </button>
    );
  } else {
    return (
      <button onClick={handleClick} className="white-btn common-btn gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          // height="14"
          viewBox="0 0 8 14"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.03592 7L8 12.8335L6.80735 14L0.246953 7.58326C0.0888289 7.42856 0 7.21876 0 7C0 6.78124 0.0888289 6.57144 0.246953 6.41673L6.80735 0L8 1.16653L2.03592 7Z"
            fill="#777777"
          />
        </svg>
        {name}
      </button>
    );
  }
};

export default WhiteButton;
