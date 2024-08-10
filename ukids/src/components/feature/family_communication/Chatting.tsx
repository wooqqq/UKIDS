import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Client, IMessage } from '@stomp/stompjs';
import { useAuthStore } from '../../../stores/authStore';

import ChattingBox from '../chatting/ChattingBox';
import BlueButton from '../../common/BlueButton';
import SockJS from 'sockjs-client';

interface Message {
  messageId: number;
  content: string;
  user_id: number;
  is_delete: boolean;
  create_time: string;
  update_time: string;
}

const FamilyChatting = () => {
  const { ukidsURL, token, decodedToken } = useAuthStore();
  const chatRoomId = 1;
  // const familyId = 1;
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
  const sendMessage = () => {
    console.log(stompClient);
    if (stompClient && stompClient.connected && message.trim() !== '') {
      const chatMessage = {
        type: 'TALK',
        roomId: chatRoomId,
        sender: decodedToken.userId,
        message,
      };

      stompClient.publish({
        destination: `${ukidsURL}/pub/chat/message`,
        body: JSON.stringify(chatMessage),
      });

      // 전송 후 상태 업데이트
      setMessages((prevMessages) => [
        {
          messageId: Date.now(),
          content: message,
          user_id: decodedToken.userId,
          is_delete: false,
          create_time: new Date().toISOString(),
          update_time: new Date().toISOString(),
        },
        ...prevMessages,
      ]);

      setMessage('');
      scrollToBottom();
    }
  };

  // 전송버튼 누를 때
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // 처음 입장 시
  useEffect(() => {
    console.log(decodedToken);
    console.log(token);
    console.log(token?.substring(7));
    // 방 연결

    // 웹소켓 설정
    const socket = new SockJS(`${ukidsURL}/ws/ws-stomp`);
    // 클라이언트(방 입장자) 생성 및 서버와 연결
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token?.substring(7)}`,
      },
      debug: (str) => {
        console.log('웹소켓 디버그: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 구독하기
    client.onConnect = (frame) => {
      console.log('WebSocket 연결이 열렸습니다.', frame);

      // 채팅방 메세지 구독
      client.subscribe(
        `${ukidsURL}/topic/chat/room/${chatRoomId}`,
        (message: IMessage) => {
          const receivedMessage: Message = JSON.parse(message.body);
          setMessages((prevMessages) => [receivedMessage, ...prevMessages]);
        },
      );

      // 웹소켓 클라이언트를 상태로 저장
      setStompClient(client);

      // 소켓 연결 후, 저장된 메세지 불러오기
      axios
        .get(`${ukidsURL}/api/chat/room/${chatRoomId}/messages`)
        .then((response) => {
          setMessages(response.data);
          scrollToBottom();
        })
        .catch((error) => {
          console.error('메세지 가져오기 실패:', error);
        });
    };

    client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    // 클라이언트 활성화
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
    <div className="w-3/4">
      {/* 좌측 영역 */}
      <div className="flex flex-col p-2 h-full">
        {/* 채팅 컨테이너 (메시지 + 입력창) */}
        <div className="flex flex-col h-full">
          {/* 메시지 영역 */}
          <div className="overflow-y-auto mb-1 flex flex-col-reverse h-full">
            <div ref={messagesEndRef} />
            {messages.map((storedMessage) => (
              <div
                key={storedMessage.messageId}
                className={
                  storedMessage.user_id === decodedToken.userId
                    ? 'self-end'
                    : 'self-start'
                }
              >
                <ChattingBox
                  message={storedMessage.content}
                  isSender={storedMessage.user_id === decodedToken.userId}
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
    </div>
  );
};

export default FamilyChatting;
