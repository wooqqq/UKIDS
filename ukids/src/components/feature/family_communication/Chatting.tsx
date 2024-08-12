import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Client, IMessage } from '@stomp/stompjs';
import ChattingBox from './ChattingBox';
import BlueButton from '@components/common/BlueButton';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/stores/authStore';
import { useFamilyStore } from '@stores/familyStore';
import api from '@/util/api';

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

// interface DecodedToken {
//   userId: number;
//   // 필요한 다른 필드들 추가
// }

const FamilyChatting = () => {
  const { ukidsURL, token } = useAuthStore();
  const { selectedFamilyId } = useFamilyStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClientInstance, setStompClientInstance] = useState<Client | null>(
    null,
  );
  const [chatRoomId, setChatRoomId] = useState(-1);

  const userId = Number.parseInt(
    jwtDecode<JwtPayload>(localStorage.getItem('token')!).userId,
  );

  // // 디코딩된 토큰 정보 가져오기
  // const decodedToken: DecodedToken = token ? jwtDecode(token) : { userId: -1 };
  // console.log(decodedToken);

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

  const getChatList = async () => {
    const url = `/chat/room/${chatRoomId}/messages`;

    const { data } = await api.get(url);

    console.log('chats : ', data);

    const formattedMessages = data.map((chat: any) => ({
      messageId: chat.createTime,
      content: chat.message,
      user_id: chat.senderId,
      is_delete: false,
      create_time: chat.createTime,
      update_time: chat.createTime,
    }));

    formattedMessages.reverse();

    setMessages(formattedMessages);
  };

  // 채팅방 입장
  const enterChatRoom = async () => {
    console.log('Enter chat room');
    if (stompClientInstance && stompClientInstance.connected) {
      try {
        console.log('stompClientInstance:', stompClientInstance);
        stompClientInstance.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            type: 'ENTER',
            roomId: chatRoomId,
            message: message,
          }),
        });
      } catch (error) {
        console.error('Enter 메세지 전송 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  // 메세지 전송
  const sendMessage = async () => {
    console.log('Sending message:', message);
    if (
      stompClientInstance &&
      stompClientInstance.connected &&
      message.trim() !== ''
    ) {
      try {
        console.log('stompClientInstance:', stompClientInstance);
        stompClientInstance.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            type: 'TALK',
            roomId: chatRoomId,
            sender: userId,
            message: message,
          }),
        });

        setMessage('');
        scrollToBottom();
      } catch (error) {
        console.error('메세지 전송 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  // 전송버튼 누를 때
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // 처음 입장 시
  useEffect(() => {
    api.get(`/chat/room/${selectedFamilyId}`).then((response: any) => {
      console.log(response);
      setChatRoomId(Number.parseInt(response.result.chatRoomId));
      console.log(chatRoomId);
    });

    const socket = new SockJS(`${ukidsURL}/ws/ws-stomp`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `${token}`,
      },
      debug: (str) => {
        console.log('웹소켓 디버그: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      console.log('WebSocket 연결이 열렸습니다.', frame);

      // 올바른 stompClientInstance 설정
      console.log('Setting stompClientInstance:', client);
      setStompClientInstance(client);

      client.subscribe(`/sub/chat/room/${chatRoomId}`, (message: IMessage) => {
        console.log('Received message:', message.body);
        const receivedRawMessage = JSON.parse(message.body);

        const receivedMessage: Message = {
          messageId: receivedRawMessage.createTime,
          content: receivedRawMessage.message,
          user_id: receivedRawMessage.senderId,
          is_delete: false,
          create_time: receivedRawMessage.createTime,
          update_time: receivedRawMessage.createTime,
        };
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) => msg.messageId === receivedMessage.messageId,
          );
          if (!messageExists) {
            return [receivedMessage, ...prevMessages];
          }
          return prevMessages;
        });
      });
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
  }, [ukidsURL, token, chatRoomId]);

  useEffect(() => {
    getChatList();
    enterChatRoom();
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
