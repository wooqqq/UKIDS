import { useNavigate } from 'react-router-dom';
import GrayButton from './GrayButton';

const ProfileList = () => {
  const nav = useNavigate();
  const onClicksettingButton = () => {
    // 설정 페이지로 이동
    nav('/setting');
  };
  return (
    <div className="profile-list">
      <GrayButton name="로그아웃" />
      <GrayButton name="설정" onClick={onClicksettingButton} />
    </div>
  );
};

export default ProfileList;
