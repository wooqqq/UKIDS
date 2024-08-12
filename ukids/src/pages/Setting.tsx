import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UserUpdate from '../components/feature/user/UserUpdate';
import FamilyUpdate from '../components/feature/family/FamilyUpdate';
import FamilyMemberUpdate from '../components/feature/family/FamilyMemberUpdate';
import '../components/common/common.css';

const MyPage = () => {
  const location = useLocation();
  // const [activeButton, setActiveButton] = useState('');
  const nav = useNavigate();

  const handleClick = (path: string) => {
    // setActiveButton(path); // 클릭된 버튼의 경로를 상태로 저장
    nav(path);
  };

  // 현재 경로에 맞는 버튼의 클래스를 설정
  const getButtonClass = (path: string) => {
    return location.pathname === `/setting/${path}` ? 'active' : '';
  };

  return (
    <>
      <div className="feature-box px-[15px] py-[40px]">
        <section className="flex">
          <div className="setting-menu-box">
            <button
              className={`block setting-menu-btn ${getButtonClass('mypage')}`}
              onClick={() => handleClick('mypage')}
            >
              개인 정보 수정
            </button>
            <button
              className={`block setting-menu-btn ${getButtonClass(
                'familyroom',
              )}`}
              onClick={() => handleClick('familyroom')}
            >
              가족 정보 수정
            </button>
            <button
              className={`block setting-menu-btn ${getButtonClass(
                'familymember',
              )}`}
              onClick={() => handleClick('familymember')}
            >
              가족 구성원 수정
            </button>
          </div>
          <section className="setting-box">
            <Routes>
              <Route path="mypage" element={<UserUpdate />} />
              <Route path="familyroom" element={<FamilyUpdate />} />
              <Route path="familymember" element={<FamilyMemberUpdate />} />
            </Routes>
          </section>
        </section>
      </div>
    </>
  );
};

export default MyPage;
