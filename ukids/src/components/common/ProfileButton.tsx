import './common.css';
import './button.css';

// 프로필 버튼 관련 (클릭하면 가족 리스트 보이기)
interface UserProps {
  name: string;
  hasFamily: boolean;
  isManager: boolean;
}

const ProfileBtn = (UserProps: UserProps) => {
  const handleClick = () => {
    console.log('dropdown');
  };

  if (!UserProps.hasFamily) {
    return (
      <div className="">
        <div className="inline-block profile-name">{UserProps.name}</div>
        <button onClick={handleClick} className="profile-btn">
          <div>가족방을 만들어보세요!</div>
          <div className="fill-black">▼</div>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-5">
        <div className="inline-block profile-name">{UserProps.name}</div>
        <button onClick={handleClick} className="profile-btn">
          <div>현재 선택된 가족방 + 대표 + 태그</div>
          <div className="fill-black">▼</div>
        </button>
      </div>
    );
    // if (isManager)
    // {
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="21"
    //     height="17"
    //     viewBox="0 0 21 17"
    //     fill="none"
    //   >
    //     <path
    //       d="M20.9808 6.1733C20.9808 6.18346 20.9808 6.1927 20.9743 6.20286L18.8476 15.799C18.7822 16.1369 18.5991 16.4417 18.3301 16.6609C18.061 16.8802 17.7228 17.0001 17.3736 17H3.63015C3.28116 16.9999 2.94314 16.8799 2.67426 16.6607C2.40539 16.4414 2.2225 16.1367 2.15706 15.799L0.0304229 6.20286C0.0304229 6.1927 0.0257345 6.18346 0.0238592 6.1733C-0.0343447 5.85558 0.0146243 5.52783 0.163284 5.24012C0.311943 4.95241 0.552118 4.72056 0.847109 4.58C1.1421 4.43945 1.47569 4.39791 1.79689 4.46174C2.1181 4.52557 2.40927 4.69125 2.6259 4.93348L5.78304 8.28616L9.13991 0.868502C9.14007 0.865425 9.14007 0.862341 9.13991 0.859264C9.25995 0.602751 9.45206 0.385495 9.69352 0.233213C9.93498 0.080931 10.2157 0 10.5023 0C10.789 0 11.0697 0.080931 11.3112 0.233213C11.5526 0.385495 11.7448 0.602751 11.8648 0.859264C11.8646 0.862341 11.8646 0.865425 11.8648 0.868502L15.2217 8.28616L18.3788 4.93348C18.5959 4.69305 18.8867 4.52899 19.207 4.4662C19.5273 4.40341 19.8597 4.44533 20.1537 4.5856C20.4476 4.72586 20.6871 4.9568 20.8357 5.24336C20.9843 5.52991 21.0339 5.85642 20.9771 6.1733H20.9808Z"
    //       fill="#FFE600"
    //     />
    //   </svg>
    // }
  }
};

export default ProfileBtn;
