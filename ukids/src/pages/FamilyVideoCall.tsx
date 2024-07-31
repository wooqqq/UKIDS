import MainLayout from '../components/MainLayout';
import VideoCall from '../components/feature/videocall/VideoCall';

const FamilyVideoCall = () => {
  return (
    <>
      <MainLayout />
      <div className="text-4xl">가족 통화방</div>
      <VideoCall />
    </>
  );
};

export default FamilyVideoCall;
