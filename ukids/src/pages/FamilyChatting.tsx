import MainLayout from '../components/MainLayout';
import GrayButton from '../components/common/GrayButton';

const FamilyChatting = () => {
  return (
    <>
      <MainLayout />

      <h1>가족 채팅방</h1>

      <GrayButton name="통화하기" path="/video-call-room" />
    </>
  );
};

export default FamilyChatting;
