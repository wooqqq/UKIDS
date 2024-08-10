import { Routes, Route } from 'react-router-dom';
import UserUpdate from '../components/feature/user/UserUpdate';
import FamilyUpdate from '../components/feature/family/FamilyUpdate';
import FamilyMemberUpdate from '../components/feature/family/FamilyMemberUpdate';

const MyPage = () => {
  return (
    <>
      <div className="feature-box">
        <h1>회원, 가족 설정</h1>
        <div className="flex">
          <div className="bg-slate-400">
            <button className="block">개인 정보 수정</button>
            <button className="block">가족 정보 수정</button>
            <button className="block">가족 구성원 수정</button>
          </div>
          <div>
            <Routes>
              <Route path="mypage" element={<UserUpdate />} />
              <Route path="familyroom" element={<FamilyUpdate />} />
              <Route path="familymember" element={<FamilyMemberUpdate />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
