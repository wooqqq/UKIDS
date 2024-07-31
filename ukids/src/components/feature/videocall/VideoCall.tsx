import React, { useState, useEffect, useCallback } from 'react';
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
  StreamManager,
} from 'openvidu-browser';
import axios, { AxiosError } from 'axios';
import Form from './Form';
import Session from './Session';

function VideoCall() {
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);

  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  const OPENVIDU_SERVER_URL = `https://${window.location.hostname}:4443`;
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession('');
    setSessionId('');
    setSubscribers([]);
    setPublisher(null);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
  }, [session]);

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
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

  useEffect(() => {
    if (session === '') return;

    session.on('streamDestroyed', (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter(
          (subscriber) => subscriber.stream.streamId !== event.stream.streamId,
        ),
      );
    });

    session.on('streamCreated', (event) => {
      const newSubscriber = session.subscribe(event.stream, '');
      setSubscribers((prevSubscribers) => [...prevSubscribers, newSubscriber]);
    });

    const createSession = async (sessionIds: string): Promise<string> => {
      try {
        const data = JSON.stringify({ customSessionId: sessionIds });
        const response = await axios.post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
              )}`,
              'Content-Type': 'application/json',
            },
          },
        );

        return (response.data as { id: string }).id;
      } catch (error) {
        const errorResponse = (error as AxiosError)?.response;

        if (errorResponse?.status === 409) {
          return sessionIds;
        }

        return '';
      }
    };

    const createToken = (sessionIds: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const data = {};
        axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(
                  `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
                )}`,
                'Content-Type': 'application/json',
              },
            },
          )
          .then((response) => {
            resolve((response.data as { token: string }).token);
          })
          .catch((error) => reject(error));
      });
    };

    const getToken = async (): Promise<string> => {
      try {
        const sessionIds = await createSession(sessionId);
        const token = await createToken(sessionIds);
        return token;
      } catch (error) {
        throw new Error('Failed to get token.');
      }
    };

    getToken()
      .then((token) => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publishers = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: false,
                publishVideo: false,
                mirror: false,
              });

              setPublisher(publishers);
              session
                .publish(publishers)
                .then(() => {})
                .catch(() => {});

              session.streams.forEach((stream: StreamManager) => {
                if (stream !== publishers) {
                  const subscriber = session.subscribe(stream, '');
                  setSubscribers((prevSubscribers) => [
                    ...prevSubscribers,
                    subscriber,
                  ]);
                }
              });
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, sessionId, OPENVIDU_SERVER_URL]);

  const toggleVideo = () => {
    if (publisher) {
      const newState = !isVideoEnabled;
      publisher.publishVideo(newState);
      setIsVideoEnabled(newState);
    }
  };

  const toggleAudio = () => {
    if (publisher) {
      const newState = !isAudioEnabled;
      publisher.publishAudio(newState);
      setIsAudioEnabled(newState);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">가족통화</h1>
      {session ? (
        <>
          <Session
            publisher={publisher as Publisher}
            subscribers={subscribers}
          />
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
          sessionId={sessionId}
          sessionIdChangeHandler={sessionIdChangeHandler}
        />
      )}
    </div>
  );
}

export default VideoCall;
