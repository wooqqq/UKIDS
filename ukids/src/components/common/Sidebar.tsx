import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link
        to={'/albums'}
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <img width="97" height="91" src="/assets/album.png" alt="사진 앨범" />
        <div className="sidebar-text">사진 앨범</div>
      </Link>
      <Link
        to={'/paintdiary'}
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <img
          width="71"
          height="97"
          src="/assets/painting.png"
          alt="그림 일기"
        />
        <div className="sidebar-text">그림 일기</div>
      </Link>
      <Link
        to={'/growthdiary'}
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <img width="70" height="95" src="/assets/growth.png" alt="성장 일지" />
        <div className="sidebar-text">성장 일지</div>
      </Link>
      <Link
        to={'/chat'}
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <img width="73" height="78" src="/assets/chat.png" alt="대화방" />
        <div className="sidebar-text">대화방</div>
      </Link>
      <Link
        to={'/game'}
        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <img width="68" height="99" src="/assets/game.png" alt="게임" />
        <div className="sidebar-text">게임</div>
      </Link>
    </div>
  );
};

export default Sidebar;
