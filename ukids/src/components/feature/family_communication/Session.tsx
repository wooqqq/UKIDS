import React from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';

interface SessionProps {
  publisher: { publisher: Publisher; name: string } | null;
  subscribers: { subscriber: Subscriber; name: string }[];
}

const Session: React.FC<SessionProps> = ({ publisher, subscribers }) => {
  return (
    <div className="session-container">
      {/* 나의 비디오 스트림 */}
      {publisher && (
        <div className="video-container">
          <div id="publisher" className="stream-container">
            <video
              autoPlay
              ref={(ref) => {
                if (ref) publisher.publisher.addVideoElement(ref);
              }}
            />
            <div className="name-tag">{publisher.name}</div>
          </div>
        </div>
      )}
      {/* 상대방 비디오 스트림 */}
      <div className="video-container">
        {subscribers.map((subscriberObj, index) => (
          <div key={index} className="stream-container">
            <video
              autoPlay
              ref={(ref) => {
                if (ref) subscriberObj.subscriber.addVideoElement(ref);
              }}
            />
            <div className="name-tag">{subscriberObj.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Session;
