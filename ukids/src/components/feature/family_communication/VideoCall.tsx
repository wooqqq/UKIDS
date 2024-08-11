import { useEffect } from 'react';
import { useVideoCallStore } from '@stores/videoCallStore';
// import { useAuthStore } from '@stores/authStore';
import { jwtDecode } from 'jwt-decode';
import Session from './Session';
import './sessions.css';
import api from '../../../util/api';

interface JwtPayload {
  name: string;
}

function VideoCall() {
  const {
    subscribers,
    publisher,
    userName,
    leaveSession,
    joinSession,
    setUserName,
  } = useVideoCallStore();
  // const { familyId } = useAuthStore(); // 실제 가족 ID 사용처
  let familyId = 7;
  // console.log(familyId);

  const nameOfUser = jwtDecode<JwtPayload>(localStorage.getItem('token')!).name;
  // console.log('유저이름: ' + nameOfUser);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    setUserName(nameOfUser);

    api.get('family/all').then((response) => {
      console.log(response.data);
      familyId = response.data.result.familyId;
    });

    // 토큰 생성 및 세션에 연결하는 함수 호출
    const connectSession = async () => {
      try {
        await joinSession(familyId, userName);
        console.log('Successfully joined the session.');
      } catch (error) {
        console.error('Error joining the session:', error);
      }
    };

    connectSession();
  }, []);

  return (
    <div className="w-3/4">
      <Session publisher={publisher} subscribers={subscribers} />
    </div>
  );
}

export default VideoCall;
