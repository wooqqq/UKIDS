import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useUserStore from '../stores/userStore';

import ChattingBox from '../components/feature/chatting/ChattingBox';
import BlueButton from '../components/common/BlueButton';
import FamilyMemberList from '../components/feature/family/FamilyMemberList';

interface Message {
  messageId: number;
  content: string;
  user_id: number;
  is_delete: boolean;
  create_time: string;
  update_time: string;
}

const FamilyChatting = () => {
  const { userToken } = useUserStore();
  // user store에서 저장할 수 있을 때 가져오기. 지금은 임시로 1 지정
  const chatRoomId = 1;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

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
  const sendMessages = () => {
    if (stompClient && stompClient.connected) {
      const chatMessage = {
        chatRoomId,
        content: message,
      };
      stompClient.publish({
        destination: `/app/chat/${chatRoomId}`,
        body: JSON.stringify(chatMessage),
      });
    }
  };

  // 전송버튼 누를 때
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // 메세지 전송되고 화면 갱신
    setMessages((messages) => [
      {
        messageId: 0,
        content: message,
        user_id: 0,
        is_delete: false,
        create_time: '',
        update_time: '',
      },
      ...messages,
    ]);

    //서버로 메세지 전송
    sendMessages();

    setMessage('');
    scrollToBottom();
  };

  // 처음 입장 시
  // 본인한테 맞는 가족방으로 입장
  // 가족방에 저장된 메세지들을 불러오고 스크롤 맨 밑으로
  useEffect(() => {
    // 본인한테 맞는 가족방으로 입장

    // 저장된 메세지 불러오기
    axios
      .get(`/api/chat/room/${chatRoomId}`)
      .then((response) => {
        const messageList = response.data.result;

        setMessages(
          messageList.filter((message: any) => {
            return !message.isDelete;
          }),
        );

        scrollToBottom();
      })
      .catch((error) => {
        console.error('메세지 가져오기 실패:', error);
      });

    // 웹소켓 설정
    const socket = new SockJS('/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/chat/${chatRoomId}`, (message: IMessage) => {
        const receivedMessage: Message = JSON.parse(message.body);
        setMessages((prevMessages) => [receivedMessage, ...prevMessages]);
      });

      setStompClient(client);
    };

    client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    client.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
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
                  storedMessage.user_id === 0 ? 'self-end' : 'self-start'
                }
              >
                <ChattingBox
                  message={storedMessage.content}
                  isSender={storedMessage.user_id === 0}
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
