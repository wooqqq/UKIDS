import MainLayout from '../components/MainLayout';
import GrayButton from '../components/common/GrayButton';

const FamilyVideoCall = () => {
  return (
    <>
      <MainLayout />

      <h1>가족 통화방</h1>

      <GrayButton name="채팅방" path="/chat-room" />
    </>
  );
};

export default FamilyVideoCall;
