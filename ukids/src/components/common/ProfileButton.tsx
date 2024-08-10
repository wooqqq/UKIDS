import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import api from '../../util/api';
import GrayButton from './GrayButton';
import './common.css';
import './button.css';

// 프로필 버튼 컴포넌트
interface Family {
  familyId: number;
  name: string;
  isRepresentative: boolean;
  role: string;
  isCurrent: boolean;
}

interface UserProps {
  name: string;
}

const ProfileButton = ({ name }: UserProps) => {
  const nav = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [familyList, setFamilyList] = useState<Family[]>([]);

  const { userInfo, getUserInfo } = useAuthStore((state) => ({
    userInfo: state.userInfo,
    getUserInfo: state.getUserInfo,
  }));

  useEffect(() => {
    // 컴포넌트가 마운트될 때 유저 정보를 가져옴
    getUserInfo();
  }, [getUserInfo]);

  // 가족방 목록을 가져오는 함수
  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const response = await api.get('/api/family/all');

        const currentUserId = userInfo?.userId;

        // 더미 데이터 추가
        const dummyFamily = {
          familyId: 1,
          name: '가족방1',
          isRepresentative: true,
          role: '아빠',
          isCurrent: true,
        };
        // API에서 받은 데이터를 가공하는 부분 (사용자 데이터와 비교하여 현재 가족방 여부 및 역할 설정)
        const families = response.data.result.map((family: any) => ({
          familyId: family.familyId,
          name: family.name,
          isRepresentative: family.userFamilyDto.userId === currentUserId,
          role: '엄마', // 실제 역할로 교체
          isCurrent: family.familyId === 1, // 현재 가족방 ID로 교체
        }));

        setFamilyList([dummyFamily, ...families]);
      } catch (error) {
        console.error('가족방 목록을 가져오는데 실패했습니다', error);
      }
    };
    if (userInfo) {
      fetchFamilies();
    }
  }, [userInfo]);

  // 드롭다운 메뉴 열기/닫기
  const handleClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // 가족방 만들기 버튼 클릭 시
  const onClickFamilyButton = () => {
    nav('/family');
    setDropdownOpen(false);
  };

  // 가족방을 클릭했을 때
  const handleFamilyClick = (familyId: number) => {
    nav(`/family/${familyId}`);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-5">
        <div className="inline-block profile-name">{name}</div>
        <button onClick={handleClick} className="profile-btn">
          <div>
            {familyList.length > 0
              ? familyList.find((family) => family.isCurrent)?.name ||
                '가족방을 선택하세요!'
              : '가족방을 만들어보세요!'}
          </div>
          <div className="fill-black">▼</div>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute mt-1 right-0 z-10 bg-[#fdfdfd] shadow-lg rounded-lg w-[250px] text-center">
          <ul className="py-2 text-sm text-gray-700">
            {familyList.map((family) => (
              <li
                key={family.familyId}
                className={`px-4 py-2 hover:bg-gray-100 ${
                  family.isCurrent ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleFamilyClick(family.familyId)}
              >
                {family.isRepresentative && <span className="mr-2">👑</span>}
                <span className="inline-block w-24 truncate">
                  {family.name}
                </span>
                <span className="ml-2">{family.role}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={onClickFamilyButton}
            className="text-[#999] mb-[45px] mt-[10px]"
          >
            가족방 만들기 +
          </button>
          <div className="flex justify-evenly mb-[20px]">
            <GrayButton name="로그아웃" path="/login" />
            <GrayButton name="설정" path="/setting/mypage" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
