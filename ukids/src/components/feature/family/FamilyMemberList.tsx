// 가족방, 게임에 사용할 참여가족 리스트 오른쪽 사이드에 위치할 예정
import { useEffect, useState } from 'react';
import callIcon from '../../../assets/subway_call-2.png';
import discallIcon from '../../../assets/subway_call-3.png';

import { useNavigate } from 'react-router-dom';
import { useVideoCallStore } from '../../../stores/videoCallStore';
import VideoToggleButton from '../family_communication/VideoToggleButton';
import AudioToggleButton from '../family_communication/AudioToggleButton';

interface FamilyMemberListProps {
  isChattingRoom: boolean;
}

const number = 3;

const FamilyMemberList = ({ isChattingRoom }: FamilyMemberListProps) => {
  const [onlineFamilyNum, setOnlineFamilyNum] = useState(0);
  const { isChatting, setIsChatting, leaveSession } = useVideoCallStore();
  const nav = useNavigate();

  const handleClickCallBtn = () => {
    setIsChatting(!isChatting);
    if (isChatting) {
      leaveSession();
      nav('/chat');
    } else {
      nav('./call');
    }
  };

  useEffect(() => {
    setIsChatting(false);
  }, []);

  // 온라인인 가족 확인 후 숫자 변경
  useEffect(() => {
    setOnlineFamilyNum(number);
  }, [number]);

  return (
    <>
      <div className="flex h-full flex-col w-1/4 p-4 border-solid border-l-2 border-l-[#999999]">
        {/* 상단 참여 가족 영역 */}
        <div className="flex items-start flex-col flex-grow overflow-y-auto mb-4">
          <h2 className="text-xl mb-4">참여가족 {`(${onlineFamilyNum})`}</h2>
          <span>아빠</span>
          <span>엄마</span>
          <span>나</span>
          {/* 가족방의 가족 목록 배열을 가져온다 
          가족 목록 배열에서 각각의 이름, 역할, 접속중인지 확인 등을 수행한다.*/}
        </div>

        {/* 가족대화방에서만 사용될 하단 버튼 영역 */}
        {isChattingRoom && (
          <div className="flex-none m-2">
            {/* 통화버튼 */}
            <div className="flex justify-center mb-2">
              {/* 채팅방/통화방 전환 */}
              <button
                onClick={handleClickCallBtn}
                className={`common-btn ${isChatting ? 'red-btn' : 'green-btn'}`}
              >
                <img
                  src={isChatting ? discallIcon : callIcon}
                  alt="call-icon"
                />
                {isChatting ? '연결끊기' : '연결하기'}
              </button>
            </div>
            {/* 카메라, 마이크 버튼 */}
            <div className="flex justify-evenly">
              <VideoToggleButton />
              <AudioToggleButton />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FamilyMemberList;
