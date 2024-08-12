import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Client, IMessage } from '@stomp/stompjs';
import { jwtDecode } from 'jwt-decode';
import SockJS from 'sockjs-client';

import './gamepart.css';

interface Participant {
  userId: number;
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

interface QuizQuestion {
  quizQuestionId: number;
  question: string;
  answer: string;
  quizType: string;
  wrongAnswer: string[];
  writer: Participant;
}

interface IsReadyMessage {
  type: 'IS_READY_GAME';
  gameStart: boolean;
}

interface GetQuizMessage {
  type: 'QUIZ_QUESTION';
  gameState: string;
  problemIndex: number;
  quizQuestion: QuizQuestion;
}

interface CheckAnswerMessage {
  type: 'QUIZ_ANSWER';
  answer: string;
}

interface ErrorMessage {
  type: 'ERROR';
  message: string;
}

type GameMessage =
  | GetQuizMessage
  | CheckAnswerMessage
  | ErrorMessage
  | IsReadyMessage;

interface JwtPayload {
  userId: string;
}
const QuizStart = () => {
  const navigate = useNavigate();
  const { ukidsURL, token } = useAuthStore();
  const familyId = 1;
  const userId = Number.parseInt(
    jwtDecode<JwtPayload>(localStorage.getItem('token')!).userId,
  );
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [inputAnswer, setInputAnswer] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(20);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isQuestionLoaded, setIsQuestionLoaded] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const setReady = async (state: boolean) => {
    if (stompClient && stompClient.connected) {
      try {
        console.log('stompClientInstance:', stompClient);
        stompClient.publish({
          destination: `/app/quiz/ready`,
          body: JSON.stringify({
            familyId,
            state,
          }),
        });
      } catch (error) {
        console.error('퀴즈 개수 설정 오류:', error);
      }
    } else {
      console.log('stompClientInstance is null or message is empty');
    }
  };

  const handleClick = () => {
    setReady(false);
    exitQuizRoom();
    navigate('/quiz');
  };

  const exitQuizRoom = async () => {
    if (stompClient && stompClient.connected) {
      try {
        console.log('stompClientInstance:', stompClient);
        stompClient.publish({
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

  const checkAnswer = async (answer: string) => {
    console.log('정답 제출 중...', answer);
    if (stompClient && stompClient.connected) {
      try {
        stompClient.publish({
          destination: `/app/quiz/answer`,
          body: JSON.stringify({
            familyId,
            inputAnswer: answer,
          }),
        });
        console.log('정답이 성공적으로 발행되었습니다.');
      } catch (error) {
        console.error('정답 확인 오류:', error);
      }
    } else {
      console.log('STOMP 클라이언트가 연결되어 있지 않습니다.');
    }
  };

  useEffect(() => {
    const socket = new SockJS(`${ukidsURL}/ws/ws-stomp`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `${token}`,
      },
      debug: (str) => {
        console.log('웹소켓 디버그:', str);
      },
    });

    client.onConnect = (frame) => {
      console.log('웹소켓 연결됨:', frame);
      setStompClient(client);

      client.subscribe(`/topic/quiz/${familyId}`, (message: IMessage) => {
        const receivedMessage: GameMessage = JSON.parse(message.body);

        console.log('received message:', receivedMessage);

        switch (receivedMessage.type) {
          case 'IS_READY_GAME':
            if (receivedMessage.gameStart) {
              setIsStart(true);
            }
            break;

          case 'QUIZ_QUESTION':
            if (receivedMessage.gameState === 'END') {
              navigate('/quiz/result');
              return;
            }

            const { quizQuestion } = receivedMessage;
            setQuizQuestion(quizQuestion);
            setQuestionIndex(receivedMessage.problemIndex);

            if (quizQuestion.quizType === 'OX') setOptions(['O', 'X']);
            if (quizQuestion.quizType === 'MULTIPLE_CHOICE')
              setOptions([...quizQuestion.wrongAnswer, quizQuestion.answer]);

            setIsLoading(false);
            setIsQuestionLoaded(true);
            resetTimer();
            setSelectedOption(null);
            break;

          case 'QUIZ_ANSWER':
            setModalMessage(`정답: ${receivedMessage.answer}`);
            setShowModal(true);
            setTimeout(() => {
              setShowModal(false);
            }, 1000);
            resetTimer();
            setIsQuestionLoaded(false);

            break;

          case 'ERROR':
            console.error('에러 메시지:', receivedMessage.message);
            break;
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
        client.deactivate();
      }
    };
  }, [ukidsURL, token, familyId]);

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      setReady(true);
    }
  }, [stompClient]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isQuestionLoaded) {
      if (secondsLeft > 0) {
        timerId = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
      } else if (secondsLeft === 0) {
        if (inputAnswer === '') {
          checkAnswer('');
        } else checkAnswer(inputAnswer);
      }
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [secondsLeft, isQuestionLoaded]);

  const handleAnswerClick = (answer: string) => {
    if (quizQuestion?.writer.userId === userId) {
      alert('자신의 문제에 답변할 수 없습니다.');
      return;
    }

    if (selectedOption === answer) {
      setSelectedOption(null);
      setInputAnswer('');
    } else {
      setSelectedOption(answer);
      setInputAnswer(answer);
    }
  };

  const resetTimer = () => {
    setSecondsLeft(20);
  };

  return (
    <div className="feature-box font-[ONE-Mobile-POP]">
      <div className="h-[15%] flex justify-center game-font quiz-font-color m-4">
        <h1>문제 {questionIndex}</h1>
      </div>

      <div className="h-[20%] flex justify-center items-center text-3xl">
        {isLoading ? (
          <p>준비중...</p>
        ) : (
          <p>
            {quizQuestion?.writer.name}이(가) {quizQuestion?.question}
          </p>
        )}
      </div>

      <div className="h-[25%] flex flex-row justify-evenly flex-wrap text-3xl">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={`option-button ${
              selectedOption === option ? 'selected' : ''
            }`}
            style={{
              fontWeight: selectedOption === option ? 'bold' : 'normal',
            }}
            disabled={quizQuestion?.writer.userId === userId}
          >
            {quizQuestion?.quizType === 'MULTIPLE_CHOICE'
              ? `${index + 1}. ${option}`
              : option}
          </button>
        ))}
      </div>

      <div className="h-[20%] flex justify-center">
        <div className="flex justify-center items-center w-[106px] h-[106px] rounded-full border-solid border-8 border-[#36d5f1] text-[#36d5f1] text-2xl">
          {secondsLeft}
        </div>
      </div>
      <div className="flex justify-center">
        {!isStart && (
          <button onClick={handleClick} className="game-btn-g game-btn-common">
            돌아가기
          </button>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizStart;
