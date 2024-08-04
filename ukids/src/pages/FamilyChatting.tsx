import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ChattingBox from '../components/feature/chatting/ChattingBox';
import BlueButton from '../components/common/BlueButton';
// import RedButton from '../components/common/RedButton';
import axios from 'axios';
import useStore from '../stores/store';

const ukidsURL = 'https://i11b306.p.ssafy.io/';

interface Message {
  messageId: string;
  content: string;
  user_id: string;
  isDelete: boolean;
}

const FamilyChatting = () => {
  const { chatRoomId } = useStore();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  // const [isChatting, setIsChatting] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    axios
      .get<Message[]>(`${ukidsURL}/message/${chatRoomId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('메세지 가져오기 실패:', error);
      });
  }, [chatRoomId]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 메세지 전송 기능 수정 예정
    setMessages([
      ...messages,
      { messageId: '', content: message, user_id: 'me', isDelete: false },
    ]);
    setMessage('');
  };

  return (
    <div className="flex h-full m-4">
      {/* 우측 영역 */}
      <div className="flex flex-col w-3/4 p-4 border-r border-gray-300">
        {/* 채팅 컨테이너 (메시지 + 입력창) */}
        <div className="flex flex-col-reverse flex-grow">
          {/* 채팅입력 영역 */}
          <div className="flex-none">
            <form className="flex" onSubmit={onSubmit}>
              <input
                type="text"
                className="flex-grow h-[50px] relative bg-white rounded-[5px] border border-[#999999] mr-4"
                onChange={onChange}
                value={message}
              />
              <BlueButton name="전송" path=" " />
            </form>
          </div>
          {/* 메시지 영역 */}
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((storedMessage) => (
              <div key={storedMessage.messageId}>
                <ChattingBox
                  message={storedMessage.content}
                  // 로그인 되어있는 userId 가져오기
                  isSender={storedMessage.user_id === 'userId'}
                />
              </div>
            ))}
            {/* 테스트 메시지 */}
            <div>
              <ChattingBox message="엄마, 용돈이 필요해요!" isSender={true} />
            </div>
            <div>
              <ChattingBox
                message="그래~ 맛있는거 사먹어라 ^^"
                isSender={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 가운데 선 */}
      <div className="w-0.5 h-[487px] bg-[#999999]" />

      {/* 좌측 영역 */}
      <div className="flex flex-col w-1/4 p-4">
        {/* 상단 참여 가족 영역 */}
        <div className="flex-grow overflow-y-auto mb-4">
          <h2 className="text-xl mb-4">참여자</h2>
          <span>아빠</span>
          <span>엄마</span>
          <span>나</span>
        </div>
        {/* 하단 버튼 영역 */}
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
      </div>
    </div>
  );
};

export default FamilyChatting;
