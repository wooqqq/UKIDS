interface ChattingProps {
  message: string;
  isSender: boolean;
}

const ChattingBox = ({ message, isSender }: ChattingProps) => {
  const color = isSender ? 'bg-[#fceecf]' : 'bg-[#cbeef4]';

  return (
    <>
      <div
        className={`flex justify-center items-center w-[371px] h-[94px] rounded-[5px] mb-4 ${color}`}
      >
        {message}
      </div>
    </>
  );
};

export default ChattingBox;
