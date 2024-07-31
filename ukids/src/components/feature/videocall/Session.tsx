import React, { useRef, useEffect } from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';

type SessionProps = {
  publisher: Publisher;
  subscribers: Subscriber[];
};

const Session: React.FC<SessionProps> = ({ publisher, subscribers }) => {
  const publisherVideoRef = useRef<HTMLVideoElement>(null);
  const subscriberVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (publisherVideoRef.current && publisher) {
      publisher.addVideoElement(publisherVideoRef.current);
    }
  }, [publisher]);

  useEffect(() => {
    subscribers.forEach((subscriber, index) => {
      if (subscriberVideoRefs.current[index] && subscriber) {
        subscriber.addVideoElement(subscriberVideoRefs.current[index]);
      }
    });
  }, [subscribers]);

  return (
    <div>
      <div id="publisher">
        {publisher && <video ref={publisherVideoRef} autoPlay={true} />}
      </div>
      <div id="subscribers">
        {subscribers.map((subscriber, index) => (
          <video
            key={index}
            ref={(el) => (subscriberVideoRefs.current[index] = el)}
            autoPlay={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Session;
