import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GrayButtonProps {
  name: string;
  path: string;
}

const GrayButton: React.FC<GrayButtonProps> = ({ name, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className="w-[100px] h-10 px-[15px] py-2 bg-[#777777] rounded-[50px] shadow justify-center items-center gap-2.5 inline-flex"
    >
      <div className="text-center text-white text-xl font-semibold font-['Pretendard']">
        {name}
      </div>
    </button>
  );
};

export default GrayButton;

// 로그아웃, 설정, 목록, 수정, 삭제, 편지쓰기, 보내기, 게임(게임하기, 돌아가기)
// 로고, 역할 태그, 프로필, 프로필 확장,
