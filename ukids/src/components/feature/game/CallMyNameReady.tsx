import { useEffect, useState } from 'react';
import CallMyNameButton from './CallMyNameButton';
import FamilyMemberList from '../family/FamilyMemberList';
import gameExplain from '@/assets/game_explain.png';
import './gamepart.css';
import { useAuthStore } from '@stores/authStore';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';

interface Participant {
  round: number;
  keyword: string | null;
  isReady: boolean;
  isCorrect: boolean;
  isHost: boolean;
}

interface CallMyNameRoomInfo {
  sessionId: string;
  isStart: boolean;
  round: number;
  currentTurn: number;
  keywordType: string | null;
  participantList: Record<string, Participant>;
  eliminatedParticipants: Record<string, Participant>;
}

const CallMyNameReady = () => {
  const { ukidsURL, token } = useAuthStore();
  const navigate = useNavigate();

  let familyId = 33;

  const [isReady, setIsReady] = useState<boolean>(false);
  const [stompClientInstance, setStompClientInstance] = useState<Client | null>(
    null,
  );
  const [roomInfo, setRoomInfo] = useState<CallMyNameRoomInfo | null>(null);

  // 방장이 선택한 카테고리 상태
  const [selectedKeywordType, setSelectedKeywordType] = useState<string | null>(
    null,
  );

  const handleClick = () => {
    setIsReady((prev) => !prev);
  };

  // 현재 사용자가 방장인지 확인
  const isHost = roomInfo?.participantList['currentUser']?.isHost ?? false;

  // 게임 방 정보 요청 및 구독
  const enterGameRoom = async () => {
    if (stompClientInstance && stompClientInstance.connected) {
      try {
        stompClientInstance.subscribe(`/topic/call/${familyId}`, (message) => {
          const data = JSON.parse(message.body);
          setRoomInfo(data.callMyNameRoomInfo);
        });

        stompClientInstance.publish({
          destination: `/ws/ws-stomp/app/call/enter/${familyId}`,
          body: JSON.stringify({ id: familyId }),
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
      setStompClientInstance(client);
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
  }, [stompClientInstance]);

  // 준비 상태가 변경될 때 서버로 전송
  useEffect(() => {
    if (stompClientInstance && roomInfo) {
      stompClientInstance.publish({
        destination: `/ws/ws-stomp/app/call/ready/${familyId}`,
        body: JSON.stringify({ isReady }),
      });

      if (Object.values(roomInfo.participantList).every((p) => p.isReady)) {
        navigate('../start');
      }
    }
  }, [isReady]);

  // 방장이 키워드 카테고리를 선택할 때 서버로 전송
  const handleKeywordTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const keywordType = event.target.value;
    setSelectedKeywordType(keywordType);

    if (stompClientInstance && roomInfo) {
      stompClientInstance.publish({
        destination: `/ws/ws-stomp/app/call/keyword/${familyId}`,
        body: JSON.stringify({ keywordType }),
      });
    }
  };

  return (
    <>
      <div className="feature-box flex h-full">
        {/* 왼쪽 영역 */}
        <div className="w-3/4 flex flex-col justify-center items-center">
          {/* 제목 */}
          <div className="h-[15%] flex flex-row">
            <span className="flex items-center game-font callmyname-font-color">
              콜마이네임 준비
            </span>
            <button className="m-4">
              <img src={gameExplain} alt="설명" />
            </button>
          </div>

          {/* 가운데 영역 */}
          <div className="h-[65%] flex flex-col justify-center">
            {/* 퀴즈 예시 */}
            <div className="m-4">
              <div className="w-[499px] h-[249px] bg-[#d9d9d9] rounded-[10px]"></div>
            </div>

            {/* 방장에게만 보이는 키워드 카테고리 선택 영역 */}
            {isHost && (
              <div className="keyword-selection">
                <p>키워드 카테고리 선택:</p>
                <label>
                  <input
                    type="radio"
                    value="idol"
                    checked={selectedKeywordType === 'idol'}
                    onChange={handleKeywordTypeChange}
                  />
                  아이돌
                </label>
                <label>
                  <input
                    type="radio"
                    value="actor"
                    checked={selectedKeywordType === 'actor'}
                    onChange={handleKeywordTypeChange}
                  />
                  배우
                </label>
                <label>
                  <input
                    type="radio"
                    value="historical"
                    checked={selectedKeywordType === 'historical'}
                    onChange={handleKeywordTypeChange}
                  />
                  역사 인물
                </label>
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="h-[15%] flex flex-row p-4">
            {!isReady ? (
              <>
                <CallMyNameButton name="돌아가기" path="../" />
                <button
                  onClick={handleClick}
                  className="game-btn-callmyname game-btn-common"
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

export default CallMyNameReady;
