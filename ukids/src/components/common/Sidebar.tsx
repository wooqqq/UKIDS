const Sidebar = () => {
  return (
    <div className="w-[160px] flex flex-col items-center justify-start gap-[33px] py-[9px] px-[32px] bg-[#fff] rounded-[25px]  shadow-lg">
      <img
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        width="97"
        height="91"
        src="/assets/album.png"
        alt="사진 앨범"
      ></img>
      <img
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        width="71"
        height="97"
        src="/assets/diary.png"
        alt="그림 일기"
      ></img>
      <img
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        width="70"
        height="95"
        src="/assets/journal.png"
        alt="성장 일지"
      ></img>
      <img
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        width="73"
        height="78"
        src="/assets/chat.png"
        alt="대화방"
      ></img>
      <img
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        width="68"
        height="99"
        src="/assets/game.png"
        alt="게임"
      ></img>
    </div>
  );
};

export default Sidebar;
