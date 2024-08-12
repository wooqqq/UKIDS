import { useEffect, useState } from 'react';
import QuizButton from './QuizButton';
import FamilyMemberList from '../family/FamilyMemberList';
import gameExplain from '@/assets/game_explain.png';
import './gamepart.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuthStore } from '@stores/authStore';

const QuizReady = () => {
  const { ukidsURL, token } = useAuthStore();
  const familyId = 7;

  const [isReady, setIsReady] = useState<boolean>(false);
  const [stompClientInstance, setStompClientInstance] = useState<Client | null>(
    null,
  );

  const handleClick = () => {
    setIsReady((prev) => !prev);
  };

  // 퀴즈방 입장
  const enterGameRoom = async () => {
    console.log('Enter chat room');
    if (stompClientInstance && stompClientInstance.connected) {
      try {
        console.log('stompClientInstance:', stompClientInstance);
        stompClientInstance.publish({
          destination: `/quiz/enter/${familyId}`,
          body: JSON.stringify({
            type: 'ENTER',
            roomId: familyId,
          }),
        });
      } catch (error) {
        console.error('Enter 메세지 전송 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  // 처음 입장 시
  useEffect(() => {
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

      client.subscribe(`/topic/quiz/${familyId}`, () => {});
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
  }, [ukidsURL, token]);

  useEffect(() => {
    enterGameRoom();
  }, []);

  // 준비 완료, 취소 될때
  useEffect(() => {
    if (isReady === true) {
    } else {
    }
  }, [isReady]);

  return (
    <>
      <div className="feature-box flex h-full">
        {/* 왼쪽 영역 */}
        <div className="w-3/4 flex flex-col justify-center items-center">
          {/* 제목 */}
          <div className="h-[15%] flex flex-row">
            <span className="flex items-center game-font quiz-font-color">
              가족 퀴즈 준비
            </span>
            <button className="mx-4">
              <img src={gameExplain} alt="설명" />
            </button>
          </div>

          {/* 가운데 영역 */}
          <div className="h-[65%] flex flex-col justify-center">
            {/* 문제 개수 정하기 */}
            <div className="flex justify-center">
              <span>1인 출제 문제 개수 </span>
              <select name="quizCnt" id="num">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <span>개</span>
            </div>

            {/* 퀴즈 예시 */}
            <div className="m-4">
              <div className="w-[499px] h-[249px] bg-[#d9d9d9] rounded-[10px]"></div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="h-[15%] flex flex-row p-4">
            {!isReady ? (
              <>
                <QuizButton name="돌아가기" path="../" />
                <button
                  onClick={handleClick}
                  className="game-btn-quiz game-btn-common"
                >
                  준비 완료!
                </button>
              </>
            ) : (
              <button
                onClick={handleClick}
                className="game-btn-g game-btn-common"
              >
                준비 취소
              </button>
            )}
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <FamilyMemberList isChattingRoom={false} />
      </div>
    </>
  );
};

export default QuizReady;
