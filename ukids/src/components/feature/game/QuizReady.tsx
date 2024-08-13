import { useState, useEffect } from 'react';
import QuizButton from './QuizButton';
import { useAuthStore } from '@/stores/authStore';
import gameExplain from '@/assets/game_explain.png';
import './gamepart.css';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';
import { useFamilyStore } from '@/stores/familyStore.ts';
import ReadyCall from './ReadyCall';

interface Participant {
  userName: string;
  role: string;
  maxQuestion: number;
  hit: number;
  isReady: boolean;
}

interface GameRoom {
  sessionId: string;
  quizCount: number;
  isStart: boolean;
  numberOfParticipants: number;
  maxQuestionCounts: number;
  currentQuestionIndex: number;
  participantList: { [key: string]: Participant };
  randomQuizQuestionList: any[] | null;
}

interface EnterGameMessage {
  type: 'ENTER_GAME';
  id: number;
  webrtcConnection: string;
  gameRoomInfo: GameRoom;
}

interface ExitGameMessage {
  type: 'EXIT_GAME';
  id: number;
  webrtcConnection: string;
  gameRoomInfo: GameRoom;
}

interface SetQuizMessage {
  type: 'SET_QUIZ_COUNTS';
  quizCount: number;
}

interface GetQuizMaxMessage {
  type: 'GET_MAX_QUESTION_COUNTS';
  maxCounts: number;
}

interface ErrorMessage {
  type: 'ERROR';
  message: string;
}

type GameMessage =
  | EnterGameMessage
  | SetQuizMessage
  | ExitGameMessage
  | GetQuizMaxMessage
  | ErrorMessage;

const QuizReady = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (selectedValue === 0) {
      alert('문제 개수가 0입니다. 준비 상태를 변경할 수 없습니다.');
      return;
    }

    setIsReady(true); // 상태 변경
  };

  useEffect(() => {
    if (isReady) navigate('/quiz/start');
  }, [isReady]);

  const { ukidsURL, token, userInfo } = useAuthStore();
  const familyId = useFamilyStore((state) => state.selectedFamilyId);
  const user = userInfo.id;
  console.log('user : ', user);
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const [maxOptions, setMaxOptions] = useState<number>(1);
  const [stompClientInstance, setStompClientInstance] = useState<Client | null>(
    null,
  );
  const [participants, setParticipants] = useState<
    { userName: string; role: string }[]
  >([]);

  const [nameOfUser, setNameOfUser] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [connection, setConnection] = useState<string | null>(null);
  const [isEnter, setIsEnter] = useState<boolean>(false);

  const handleBack = () => {
    exitQuizRoom();
    navigate('../');
  };

  const enterQuizRoom = async () => {
    console.log('방 입장 ');
    if (stompClientInstance && stompClientInstance.connected) {
      try {
        console.log('stompClientInstance:', stompClientInstance);
        stompClientInstance.publish({
          destination: `/app/quiz/enter`,
          body: JSON.stringify({
            familyId,
          }),
        });
      } catch (error) {
        console.error('게임방 입장 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  const exitQuizRoom = async () => {
    if (stompClientInstance && stompClientInstance.connected) {
      try {
        console.log('stompClientInstance:', stompClientInstance);
        stompClientInstance.publish({
          destination: `/app/quiz/exit`,
          body: JSON.stringify({
            familyId,
          }),
        });
      } catch (error) {
        console.error('게임방 퇴장 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  const GetQuizMaxCounts = async () => {
    if (stompClientInstance && stompClientInstance.connected) {
      try {
        console.log('stompClientInstance:', stompClientInstance);
        stompClientInstance.publish({
          destination: `/app/quiz/quiz-max`,
          body: JSON.stringify({
            familyId,
            counts: `${selectedValue}`,
          }),
        });
      } catch (error) {
        console.error('최대 퀴즈 개수 갱신 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  const setQuizCounts = async () => {
    if (stompClientInstance && stompClientInstance.connected) {
      try {
        console.log('setQuizCounts : ', selectedValue);
        console.log('stompClientInstance:', stompClientInstance);
        stompClientInstance.publish({
          destination: `/app/quiz/quiz-count`,
          body: JSON.stringify({
            familyId,
            counts: `${selectedValue}`,
          }),
        });
      } catch (error) {
        console.error('퀴즈 개수 설정 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (stompClientInstance && stompClientInstance.connected) {
      enterQuizRoom();
      GetQuizMaxCounts();
    }
  }, [stompClientInstance]);

  useEffect(() => {
    if (selectedValue > 0) {
      setQuizCounts();
    }
  }, [selectedValue]);
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
    });

    client.onConnect = (frame) => {
      console.log('WebSocket 연결이 열렸습니다.', frame);

      // 올바른 stompClientInstance 설정
      console.log('Setting stompClientInstance:', client);
      setStompClientInstance(client);

      // enterQuizRoom();
      client.subscribe(`/topic/quiz/${familyId}`, (message: IMessage) => {
        console.log('Received message:', message.body);
        const receivedMessage: GameMessage = JSON.parse(message.body);

        console.log('receivedMessage : ', receivedMessage);

        switch (receivedMessage.type) {
          case 'ENTER_GAME':
            const participant =
              receivedMessage.gameRoomInfo.participantList[user];
            console.log('----user : ----', participant);
            setNameOfUser(participant.userName);
            setSessionId(receivedMessage.gameRoomInfo.sessionId);
            setConnection(receivedMessage.webrtcConnection);

            if (participant && participant.maxQuestion === 0) {
              alert('퀴즈 문제 개수가 0입니다. 게임에 참여할 수 없습니다.');
              navigate('../');
              return;
            }

            if (receivedMessage.gameRoomInfo.isStart) {
              alert('현재 게임이 진행 중입니다.');
              navigate('../');
              return;
            }

            setMaxOptions(receivedMessage.gameRoomInfo.maxQuestionCounts);

            console.log(
              'participantList:',
              receivedMessage.gameRoomInfo.participantList,
            );

            const participantEntries = Object.entries(
              receivedMessage.gameRoomInfo.participantList,
            ).map(([key, participant]) => ({
              userName: participant.userName,
              role: participant.role,
            }));
            setParticipants(participantEntries);

            break;

          case 'EXIT_GAME':
            setMaxOptions(receivedMessage.gameRoomInfo.maxQuestionCounts);

            console.log(
              'participantList:',
              receivedMessage.gameRoomInfo.participantList,
            );

            const newParticipantEntries = Object.entries(
              receivedMessage.gameRoomInfo.participantList,
            ).map(([nkey, remainParticipant]) => ({
              userName: remainParticipant.userName,
              role: remainParticipant.role,
            }));
            setParticipants(newParticipantEntries);

            break;

          case 'GET_MAX_QUESTION_COUNTS':
            setMaxOptions(receivedMessage.maxCounts);
            break;

          case 'SET_QUIZ_COUNTS':
            setSelectedValue(receivedMessage.quizCount);
            break;

          case 'ERROR':
            console.log('error : ', receivedMessage.message);
        }
      });
    };
    client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    client.activate();

    return () => {
      if (client) {
        // exitQuizRoom();
        client.deactivate();
        // navigate('../');
      }
    };
  }, [ukidsURL, token, familyId]);

  useEffect(() => {
    return () => {
      if (stompClientInstance) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/quiz/start') {
          exitQuizRoom();
        }
      }
    };
  }, [navigate]);

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
              <select
                name="quizCnt"
                id="num"
                value={selectedValue}
                onChange={handleSelectChange}
              >
                {Array.from({ length: maxOptions }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
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
                <button
                  onClick={handleBack}
                  className="game-btn-quiz game-btn-common"
                >
                  돌아가기
                </button>

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
        <div className="w-1/4 p-4">
          <h2 className="text-xl font-bold mb-2">참여자 목록</h2>
          <ul>
            {participants.map((participant, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{participant.userName}</span>:{' '}
                {participant.role}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {nameOfUser && sessionId && connection && (
            <ReadyCall
              nameOfUser={nameOfUser}
              sessionId={sessionId}
              token={connection}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuizReady;
