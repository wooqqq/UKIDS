import { useNavigate } from 'react-router-dom';

interface GamePageHeader {
  title: string;
}

const GamePageHeader = ({ title }: GamePageHeader) => {
  const nav = useNavigate();
  const onClick = () => {
    nav('../');
  };

  return (
    <>
      {/* 헤더 내부 플렉스 */}
      <div className="w-full flex justify-between">
        {/* 좌측 상단 버튼 */}
        <div className="">
          <button
            className="w-20 h-8 ml-8 rounded-[50px] shadow flex justify-center items-center gap-1 text-[#777777] font-medium text-sm"
            onClick={onClick}
          >
            {`< 이전`}
          </button>
        </div>
        {/* 제목 */}
        <div className="text-5xl font-[ONE-Mobile-POP]">{title}</div>
        {/* 빈 div로 오른쪽 여백 맞추기 */}
        <div className="w-20 mr-8"> </div>
      </div>
    </>
  );
};

export default GamePageHeader;
