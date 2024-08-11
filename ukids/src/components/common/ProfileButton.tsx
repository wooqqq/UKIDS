import { useState } from 'react';
import './common.css';
import './button.css';
import GrayButton from './GrayButton';
import { useNavigate } from 'react-router-dom';

// 프로필 버튼 관련 (클릭하면 가족 리스트 보이기)
interface UserProps {
  name: string;
  hasFamily: boolean;
  isManager: boolean;
}

const ProfileButton = (UserProps: UserProps) => {
  const nav = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onClickFamilyButton = () => {
    nav('/family');
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-5">
        <div className="inline-block profile-name">{UserProps.name}</div>
        <button onClick={handleClick} className="profile-btn">
          <div>
            {UserProps.hasFamily
              ? '현재 선택된 가족방 + 대표 + 태그'
              : '가족방을 만들어보세요!'}
          </div>
          <div className="fill-black">▼</div>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute mt-2 right-0 z-10 bg-white shadow-lg rounded-lg w-48">
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100">가족방 1</li>
            <li className="px-4 py-2 hover:bg-gray-100">가족방 2</li>
            <li className="px-4 py-2 hover:bg-gray-100">가족방 3</li>
          </ul>
          <button onClick={onClickFamilyButton}>가족방 만들기</button>
          {UserProps.isManager && (
            <div className="px-4 py-2 bg-yellow-500 text-white rounded-b-lg">
              관리자로 설정됨
            </div>
          )}
          <div className="flex justify-around">
            <GrayButton name="로그아웃" path="/login" />
            <GrayButton name="설정" path="/setting/mypage" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
