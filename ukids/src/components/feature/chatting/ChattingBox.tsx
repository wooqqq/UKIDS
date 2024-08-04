interface ChattingProps {
  message: string;
  isSender: boolean;
}

const ChattingBox = ({ message, isSender }: ChattingProps) => {
  const color: string = isSender ? 'bg-[#fceecf]' : 'bg-[#cbeef4]';
  const position = isSender ? 'self-end' : 'self-start';

  return (
    <>
      <div
        className={`flex justify-center items-center w-[371px] h-[94px] rounded-[5px] m-2 ${color} ${position}`}
      >
        {message}
      </div>
    </>
  );
};

export default ChattingBox;
