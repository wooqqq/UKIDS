import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Client, IMessage } from '@stomp/stompjs';

import ChattingBox from '../chatting/ChattingBox';
import BlueButton from '../../common/BlueButton';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/stores/authStore';
import api from '../../../util/api';
import axios from 'axios';

interface Message {
  messageId: number;
  content: string;
  user_id: number;
  is_delete: boolean;
  create_time: string;
  update_time: string;
}

interface JwtPayload {
  userId: string;
}

const FamilyChatting = () => {
  const { ukidsURL, token } = useAuthStore();
  const chatRoomId = 1;
  const familyId = 1;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const userId = Number.parseInt(
    jwtDecode<JwtPayload>(localStorage.getItem('token')!).userId,
  );

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

  // 메세지 전송
  const sendMessage = async () => {
    if (stompClient && stompClient.connected && message.trim() !== '') {
      try {
        // 서버로 메시지 전송 (POST 요청)
        const response = await axios.post(
          `${ukidsURL}/ws/ws-stomp/pub/chat/message`,
          JSON.stringify({
            type: 'TALK',
            roomId: chatRoomId,
            sender: userId,
            message,
          }),
          {
            headers: {
              Authorization: token,
            },
          },
        );

        if (response.status !== 200) {
          throw new Error('Failed to send message');
        }

        // 전송 후 상태 업데이트
        setMessages((prevMessages) => [
          {
            messageId: Date.now(),
            content: message,
            user_id: userId,
            is_delete: false,
            create_time: new Date().toISOString(),
            update_time: new Date().toISOString(),
          },
          ...prevMessages,
        ]);

        setMessage('');
        scrollToBottom();
      } catch (error) {
        console.error('메세지 전송 오류:', error);
      }
    }
  };

  // 전송버튼 누를 때
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // 처음 입장 시
  useEffect(() => {
    console.log(userId);
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

    // 소켓 연결 후, 저장된 메세지 불러오기
    api
      .get(`/chat/room/${chatRoomId}/messages`)
      .then((response) => {
        setMessages(
          response.data.map((msg: any) => ({
            messageId: msg.messageId,
            content: msg.message,
            user_id: msg.userId,
            is_delete: msg.is_delete,
            create_time: msg.createTime,
            update_time: msg.updateTime,
          })),
        );
        scrollToBottom();
      })
      .catch((error) => {
        console.error('메세지 가져오기 실패:', error);
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
            {messages.length === 0 ? (
              <div>대화를 시작해보세요!</div>
            ) : (
              messages.map((storedMessage) => (
                <div
                  key={storedMessage.messageId}
                  className={
                    storedMessage.user_id === userId ? 'self-end' : 'self-start'
                  }
                >
                  <ChattingBox
                    message={storedMessage.content}
                    isSender={storedMessage.user_id === userId}
                  />
                </div>
              ))
            )}
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
