interface ChattingProps {
  message: string;
  isSender: boolean;
  sender: string;
}

const ChattingBox = ({ message, isSender, sender }: ChattingProps) => {
  if (!message.trim()) return null;

  const color = isSender ? 'bg-[#fceecf]' : 'bg-[#cbeef4]';

  return (
    <>
      <div className=" mb-4 mx-1">
        {isSender ? null : <p>{sender}</p>}
        {/* <p className="flex justify-end">{sender}</p> */}
        <div
          className={`flex justify-center items-center px-4 fpy-2 rounded-[5px] ${color}`}
          
        >
          {message}
        </div>
      </div>
    </>
  );
};

export default ChattingBox;
