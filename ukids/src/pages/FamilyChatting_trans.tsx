// ChatRoom.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatRoom = () => {
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);
  const messagesEndRef = useRef(null);

  // 컴포넌트가 처음 마운트될 때 실행
  useEffect(() => {
    const roomId = localStorage.getItem('wschat.roomId');
    const sender = localStorage.getItem('wschat.sender');

    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/api/chat/room/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        console.error('채팅방 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/room/${roomId}/messages`);
        setMessages(
          response.data.map((msg) => ({
            timestamp: new Date().toISOString(),
            type: msg.type,
            sender: msg.type === 'ENTER' ? '[알림]' : msg.sender,
            message: msg.message,
            createTime: msg.createTime,
          })),
        );
      } catch (error) {
        console.error('메시지를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchRoom();
    fetchMessages();

    const stompClient = Stomp.over(new SockJS('/ws/ws-stomp'));
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const recv = JSON.parse(message.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              timestamp: new Date().toISOString(),
              type: recv.type,
              sender: recv.type === 'ENTER' ? '[알림]' : recv.sender,
              message: recv.message,
              createTime: new Date().toISOString(),
            },
          ]);
          scrollToBottom();
        });

        stompClient.send(
          '/pub/chat/message',
          {},
          JSON.stringify({
            type: 'ENTER',
            roomId,
            sender,
          }),
        );
      },
      (error) => {
        console.error('WebSocket 연결 실패:', error);
      },
    );

    setClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => console.log('Disconnected'));
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;
    client.send(
      '/pub/chat/message',
      {},
      JSON.stringify({
        type: 'TALK',
        roomId: localStorage.getItem('wschat.roomId'),
        sender: localStorage.getItem('wschat.sender'),
        message,
      }),
    );
    setMessage('');
  };

  const leaveRoom = () => {
    client.send(
      '/pub/chat/leave',
      {},
      JSON.stringify({
        type: 'EXIT',
        roomId: localStorage.getItem('wschat.roomId'),
        sender: localStorage.getItem('wschat.sender'),
      }),
    );
    localStorage.removeItem('wschat.roomId');
    localStorage.removeItem('wschat.sender');

    // 이동해야되는 부분으로 이동시키기
    window.location.href = '/api/chat/room';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', options);
  };

  return (
    <div className="container">
      <div>
        <h2>{room.name}</h2>
      </div>
      <ul
        className="list-group chat-messages"
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {messages.map((msg) => (
          <li className="list-group-item" key={msg.timestamp}>
            {msg.sender} - {msg.message}
            <small className="text-muted">{formatDate(msg.createTime)}</small>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">내용</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={sendMessage}
          >
            보내기
          </button>
        </div>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={leaveRoom}>
          채팅방 나가기
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
