import GameBackButton from './GameBackButton';

interface GamePageHeader {
  title: string;
}

const GamePageHeader = ({ title }: GamePageHeader) => {
  return (
    <>
      {/* 헤더 내부 플렉스 */}
      <div className="w-full flex justify-between">
        {/* 좌측 상단 버튼 */}
        <GameBackButton path={'../'} />
        {/* 제목 */}
        <p className="text-5xl font-[ONE-Mobile-POP]">{title}</p>
        {/* 빈 div로 오른쪽 여백 맞추기 */}
        <div className="w-[6rem]"> </div>
      </div>
    </>
  );
};

export default GamePageHeader;
