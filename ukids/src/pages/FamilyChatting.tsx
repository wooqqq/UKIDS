import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import useUserStore from '../stores/userStore';

import ChattingBox from '../components/feature/chatting/ChattingBox';
import BlueButton from '../components/common/BlueButton';
import FamilyMemberList from '../components/feature/family/FamilyMemberList';

interface Message {
  messageId: string;
  content: string;
  user_id: string;
  isDelete: boolean;
}

const FamilyChatting = () => {
  const { ukidsURL, chatRoomId, loginToken } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // 사용자가 입력하는 메세지 내용 인지
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 스크롤 맨 밑으로 내리기
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 메세지 서버로 전송
  const sendMessagesToBack = async () => {
    try {
      axios
        .post<Message[]>(
          `${ukidsURL}/message`,
          {
            chatRoomId,
            content: message,
          },
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          },
        )
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // 전송버튼 누를 때
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;

    // 메세지 전송되고 화면 갱신
    setMessages([
      { messageId: '', content: message, user_id: 'userId', isDelete: false },
      ...messages,
    ]);

    //서버로 메세지 전송
    sendMessagesToBack();

    setMessage('');
    scrollToBottom();
  };

  // 처음 입장 시
  // 본인한테 맞는 가족방으로 입장
  // 가족방에 저장된 메세지들을 불러오고 스크롤 맨 밑으로
  useEffect(() => {
    //   // 가족방 입장
    //   function(roomId) {
    //     // 로그인한 유저의 가족 id 를 roomId로 넣어줘야 함
    //     localStorage.setItem('wschat.roomId', roomId);
    //     location.href = "/api/chat/room/enter/" + roomId;
    // }

    // 저장된 메세지 불러오기
    axios
      .get<Message[]>(`${ukidsURL}/message/${chatRoomId}`)
      .then((response) => {
        const messageList = response.data;

        setMessages(
          messageList.filter((message) => {
            return !message.isDelete;
          }),
        );

        scrollToBottom();
      })
      .catch((error) => {
        console.error('메세지 가져오기 실패:', error);
      });
  }, []);

  // 메세지에 변화가 있을 시 스크롤 맨 밑으로
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="feature-box flex h-full">
      {/* 좌측 영역 */}
      <div className="flex flex-col w-3/4 p-2">
        {/* 채팅 컨테이너 (메시지 + 입력창) */}
        <div className="flex flex-col h-full">
          {/* 메시지 영역 */}
          <div className="overflow-y-auto mb-1 flex flex-col-reverse h-full">
            <div ref={messagesEndRef} />
            {messages.map((storedMessage) => (
              <div
                key={storedMessage.messageId}
                className={
                  storedMessage.user_id === 'userId' ? 'self-end' : 'self-start'
                }
              >
                <ChattingBox
                  message={storedMessage.content}
                  isSender={storedMessage.user_id === 'userId'}
                />
              </div>
            ))}
          </div>

          {/* 채팅입력 영역 */}
          <div className="flex-none">
            <form className="flex" onSubmit={onSubmit}>
              <input
                type="text"
                className="flex-grow h-[50px] bg-white rounded-[5px] border border-[#999999] mr-4"
                onChange={onChange}
                value={message}
              />
              <BlueButton name="전송" path="" />
            </form>
          </div>
        </div>
      </div>

      {/* 우측 영역 */}
      <FamilyMemberList isChattingRoom={true} />
    </div>
  );
};

export default FamilyChatting;
