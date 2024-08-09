import React from 'react';

interface FormProps {
  joinSession: () => void;
  createSession: () => void;
  sessionId: string;
  sessionIdChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userName: string;
  userNameChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: React.FC<FormProps> = ({
  joinSession,
  createSession,
  sessionId,
  sessionIdChangeHandler,
  userName,
  userNameChangeHandler,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="세션 ID"
        value={sessionId}
        onChange={sessionIdChangeHandler}
      />
      <input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={userNameChangeHandler}
      />
      <button onClick={joinSession}>방 참가</button>
      <button onClick={createSession}>세션 생성</button>
    </div>
  );
};

export default Form;
