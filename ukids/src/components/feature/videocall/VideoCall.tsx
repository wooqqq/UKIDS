import React, { useState, useEffect, useCallback } from 'react';
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from 'openvidu-browser';
import axios from 'axios';
import Form from './Form';
import Session from './Session';

function VideoCall() {
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscribers, setSubscribers] = useState<
    { subscriber: Subscriber; name: string }[]
  >([]);
  const [publisher, setPublisher] = useState<{
    publisher: Publisher;
    name: string;
  } | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const SERVER_URL = `https://i11b306.p.ssafy.io`;

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();
    setOV(null);
    setSession('');
    setSessionId('');
    setSubscribers([]);
    setPublisher(null);
    setIsVideoEnabled(false);
    setIsAudioEnabled(false);
  }, [session]);

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    const newSession = OVs.initSession();
    setSession(newSession);

    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter(
          (subscriber) =>
            subscriber.subscriber.stream.streamId !== event.stream.streamId,
        ),
      );
    });

    newSession.on('streamCreated', (event) => {
      const newSubscriber = newSession.subscribe(event.stream, '');
      const userData = JSON.parse(
        event.stream.connection.data.split('%/%')[0],
      ).clientData;
      setSubscribers((prevSubscribers) => [
        ...prevSubscribers,
        { subscriber: newSubscriber, name: userData },
      ]);
    });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  const sessionIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSessionId(event.target.value);
  };

  const userNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserName(event.target.value);
  };

  const createSession = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/webrtc`, {});
      console.log('sessionId: ', response.data);
      //return (response.data as { result: string }).result;
    } catch (error) {
      //const errorResponse = (error as AxiosError)?.response;
      // if (errorResponse?.status === 409) {
      //   // return sessionIds;
      // }
      throw new Error('Failed to create session.');
    }
  };

  useEffect(() => {
    if (session === '' || !OV || sessionId === '') return;

    const createToken = (sessionIds: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${SERVER_URL}/api/webrtc/${sessionIds}`, {})
          .then((response) => {
            resolve((response.data as { result: string }).result);
          })
          .catch((error) => reject(error));
      });
    };

    const getToken = async (): Promise<string> => {
      try {
        let sessionIds = sessionId;
        try {
          //sessionIds = await createSession(sessionId);
          //console.log('Call createSession');
        } catch (error) {
          // if (error.message !== 'Failed to create session.') {
          //   throw error;
          // }
        }
        console.log(`sessionIds: ${sessionIds}`);
        const token = await createToken(sessionIds);
        console.log(`token: ${token}`);
        return token;
      } catch (error) {
        throw new Error('Failed to get token.');
      }
    };

    getToken()
      .then((token) => {
        session
          .connect(token, { clientData: userName })
          .then(() => {
            const publishers = OV.initPublisher(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: false,
              publishVideo: false,
              mirror: false,
            });
            setPublisher({ publisher: publishers, name: '나' });
            session.publish(publishers).catch(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, sessionId, userName, SERVER_URL]);

  const toggleVideo = () => {
    if (publisher) {
      const newState = !isVideoEnabled;
      publisher.publisher.publishVideo(newState);
      setIsVideoEnabled(newState);
    }
  };

  const toggleAudio = () => {
    if (publisher) {
      const newState = !isAudioEnabled;
      publisher.publisher.publishAudio(newState);
      setIsAudioEnabled(newState);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">가족통화</h1>
      {session ? (
        <>
          <Session publisher={publisher} subscribers={subscribers} />
          <button onClick={leaveSession}>돌아가기</button>
          <button onClick={toggleVideo}>
            {isVideoEnabled ? '비디오 끄기' : '비디오 켜기'}
          </button>
          <button onClick={toggleAudio}>
            {isAudioEnabled ? '음소거' : '음소거 해제'}
          </button>
        </>
      ) : (
        <Form
          joinSession={joinSession}
          createSession={createSession}
          sessionId={sessionId}
          sessionIdChangeHandler={sessionIdChangeHandler}
          userName={userName}
          userNameChangeHandler={userNameChangeHandler}
        />
      )}
    </div>
  );
}

export default VideoCall;