import React from 'react';

type FormProps = {
  joinSession: () => void;
  sessionId: string;
  sessionIdChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form: React.FC<FormProps> = ({
  joinSession,
  sessionId,
  sessionIdChangeHandler,
}) => {
  return (
    <div>
      <input
        type="text"
        value={sessionId}
        onChange={sessionIdChangeHandler}
        placeholder="세션 ID를 입력하세요"
        className="border border-[#999999] p-1"
      />
      <button
        onClick={joinSession}
        className="bg-emerald-400 text-white p-1 rounded-md"
      >
        세션 참여
      </button>
    </div>
  );
};

export default Form;
