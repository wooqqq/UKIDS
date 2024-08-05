// 가족방, 게임에 사용할 참여가족 리스트 오른쪽 사이드에 위치할 예정
import { useEffect, useState } from 'react';
import BlueButton from '../../common/BlueButton';

interface FamilyMemberListProps {
  isChattingRoom: boolean;
}

const number = 4;

const FamilyMemberList = ({ isChattingRoom }: FamilyMemberListProps) => {
  const [onlineFamilyNum, setOnlineFamilyNum] = useState(0);

  useEffect(() => {
    setOnlineFamilyNum(number);
  }, [onlineFamilyNum]);

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
        {isChattingRoom ? (
          <div className="flex-none m-2">
            {/* 통화버튼 */}
            <div className="mb-2">
              <BlueButton name="연결하기" path="/chat/call" />
              {/* 나중에 통화방 전환시 사용 */}
              {/* {isChatting ? (
              <BlueButton name="연결하기" path="/chat/call" />
            ) : (
              <RedButton name="연결끊기" path="/chat" />
            )} */}
            </div>
            {/* 카메라, 마이크 버튼 */}
            <div className="flex space-x-2">
              <BlueButton name="카메라" path="#" />
              <BlueButton name="마이크" path="#" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FamilyMemberList;
