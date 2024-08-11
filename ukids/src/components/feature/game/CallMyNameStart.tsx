import { useVideoCallStore } from '@stores/videoCallStore';

const CallMyNameStart = () => {
  const {} = useVideoCallStore();

  return (
    <>
      <div>콜마이네임시작</div>
    </>
  );
};

export default CallMyNameStart;
