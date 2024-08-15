import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './button.css';

interface GrayButtonProps {
  name: string;
  path: string;
  className?: string;
  type?: string;
  onClick?: () => void; // onClick 타입 정의 추가
}

const GrayButton = (props: GrayButtonProps) => {
  const nav = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick(); // onClick 함수 호출
    } else {
      nav(props.path);
    }
  };

  // const deleteHandleClick = () => {
  //   if (props.onClick) {
  //     props.onClick();
  //   } else {
  //     nav(props.path);
  //   }
  // };

  const onClickLogoutButton = () => {
    localStorage.removeItem('token');
    
    if (localStorage.getItem('selectedFamilyId') !== null) {
      localStorage.removeItem('selectedFamilyId');
    }

    setToken(null);
    nav(props.path);
  };

  if (props.name == '로그아웃') {
    return (
      <button
        onClick={onClickLogoutButton}
        className="rounded-md gray-btn common-btn w-[120px]"
      >
        {props.name}
      </button>
    );
  } else if (props.name == '설정') {
    return (
      <button
        onClick={handleClick}
        className="setting rounded-md gray-btn common-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M16.6931 2.311C15.813 2.11466 14.9148 2.01044 14.0131 2C13.0904 2.01067 12.1891 2.11433 11.3091 2.311C11.121 2.35261 10.9508 2.4522 10.8223 2.59573C10.6938 2.73926 10.6137 2.91948 10.5931 3.111L10.3841 4.988C10.3541 5.25275 10.2626 5.50681 10.1169 5.72984C9.97111 5.95288 9.77517 6.1387 9.54473 6.27244C9.31429 6.40618 9.05574 6.48411 8.78978 6.50001C8.52382 6.51591 8.25782 6.46933 8.01309 6.364L6.29309 5.607C6.11851 5.53014 5.92435 5.50945 5.73749 5.54779C5.55063 5.58613 5.3803 5.6816 5.25009 5.821C4.00617 7.15208 3.07999 8.74769 2.54109 10.488C2.48371 10.6712 2.48506 10.8677 2.54495 11.0501C2.60485 11.2324 2.72028 11.3915 2.87509 11.505L4.40209 12.63C4.61706 12.7879 4.79185 12.9942 4.91232 13.2322C5.03279 13.4702 5.09556 13.7332 5.09556 14C5.09556 14.2668 5.03279 14.5298 4.91232 14.7678C4.79185 15.0058 4.61706 15.2121 4.40209 15.37L2.87509 16.498C2.72048 16.6114 2.60518 16.7703 2.54529 16.9525C2.48541 17.1346 2.48394 17.331 2.54109 17.514C3.07999 19.2554 4.00536 20.8524 5.24809 22.186C5.37819 22.3256 5.54845 22.4212 5.73532 22.4598C5.92219 22.4983 6.11641 22.4777 6.29109 22.401L8.01909 21.642C8.26251 21.5362 8.52731 21.4889 8.7923 21.5038C9.05729 21.5188 9.3151 21.5955 9.54509 21.728C10.0111 21.998 10.3221 22.473 10.3831 23.009L10.5911 24.886C10.6116 25.0749 10.69 25.2529 10.8157 25.3954C10.9414 25.538 11.1082 25.6381 11.2931 25.682C13.0726 26.1051 14.9266 26.1051 16.7061 25.682C16.891 25.6381 17.0577 25.538 17.1834 25.3954C17.3091 25.2529 17.3876 25.0749 17.4081 24.886L17.6161 23.006C17.6443 22.7411 17.7346 22.4866 17.8798 22.2632C18.0249 22.0397 18.2207 21.8537 18.4512 21.7202C18.6818 21.5867 18.9406 21.5095 19.2066 21.4949C19.4726 21.4802 19.7383 21.5286 19.9821 21.636L21.7091 22.395C21.8838 22.4717 22.078 22.4923 22.2649 22.4538C22.4517 22.4152 22.622 22.3196 22.7521 22.18C23.9942 20.8479 24.9195 19.2526 25.4591 17.513C25.5165 17.3298 25.5151 17.1333 25.4552 16.9509C25.3953 16.7686 25.2799 16.6095 25.1251 16.496L23.6001 15.37C23.3851 15.2121 23.2102 15.0059 23.0896 14.7679C22.9691 14.53 22.9062 14.267 22.9061 14.0003C22.906 13.7335 22.9687 13.4705 23.0891 13.2324C23.2095 12.9944 23.3842 12.788 23.5991 12.63L25.1241 11.503C25.2785 11.3894 25.3936 11.2305 25.4533 11.0483C25.513 10.8662 25.5143 10.6699 25.4571 10.487C24.9185 8.74678 23.9926 7.15118 22.7491 5.82C22.6189 5.6806 22.4486 5.58513 22.2617 5.54679C22.0748 5.50845 21.8807 5.52914 21.7061 5.606L19.9861 6.363C19.7718 6.45732 19.5403 6.50635 19.3061 6.507C18.8871 6.50645 18.4831 6.3512 18.1716 6.07105C17.86 5.79089 17.6629 5.40556 17.6181 4.989L17.4081 3.11C17.3874 2.91893 17.3075 2.73912 17.1794 2.59582C17.0514 2.45252 16.8806 2.35292 16.6931 2.311ZM14.0001 18C12.9392 18 11.9218 17.5786 11.1717 16.8284C10.4215 16.0783 10.0001 15.0609 10.0001 14C10.0001 12.9391 10.4215 11.9217 11.1717 11.1716C11.9218 10.4214 12.9392 10 14.0001 10C15.061 10 16.0784 10.4214 16.8285 11.1716C17.5787 11.9217 18.0001 12.9391 18.0001 14C18.0001 15.0609 17.5787 16.0783 16.8285 16.8284C16.0784 17.5786 15.061 18 14.0001 18Z"
            fill="white"
          />
        </svg>
      </button>
    );
  } else if (props.name == '초대') {
    return (
      <button
        onClick={handleClick}
        className="setting rounded-md gray-btn common-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 17V19H7V17C7 17 7 13 13 13C19 13 19 17 19 17ZM16 8C16 7.40666 15.8241 6.82664 15.4944 6.33329C15.1648 5.83994 14.6962 5.45543 14.1481 5.22836C13.5999 5.0013 12.9967 4.94189 12.4147 5.05765C11.8328 5.1734 11.2982 5.45912 10.8787 5.87868C10.4591 6.29824 10.1734 6.83279 10.0576 7.41473C9.94189 7.99667 10.0013 8.59987 10.2284 9.14805C10.4554 9.69623 10.8399 10.1648 11.3333 10.4944C11.8266 10.8241 12.4067 11 13 11C13.7956 11 14.5587 10.6839 15.1213 10.1213C15.6839 9.55871 16 8.79565 16 8ZM19.2 13.06C19.7466 13.5643 20.1873 14.1724 20.4964 14.8489C20.8054 15.5254 20.9766 16.2566 21 17V19H24V17C24 17 24 13.55 19.2 13.06ZM18 5C17.6979 5.00002 17.3976 5.04726 17.11 5.14C17.6951 5.97897 18.0087 6.97718 18.0087 8C18.0087 9.02282 17.6951 10.021 17.11 10.86C17.3976 10.9527 17.6979 11 18 11C18.7956 11 19.5587 10.6839 20.1213 10.1213C20.6839 9.55871 21 8.79565 21 8C21 7.20435 20.6839 6.44129 20.1213 5.87868C19.5587 5.31607 18.7956 5 18 5ZM8 10H5V7H3V10H0V12H3V15H5V12H8V10Z"
            fill="white"
          />
        </svg>
      </button>
    );
  } else {
    return (
      // <button
      //   onClick={handleClick}
      //   className="w-[100px] h-10 px-[15px] py-2 bg-[#777777] rounded-[50px] shadow justify-center items-center gap-2.5 inline-flex"
      // >
      //   <div className="text-center text-white text-base font-semibold font-['Pretendard']">
      //     {name}
      //   </div>
      // </button>
      <button onClick={handleClick} className="gray-btn common-btn">
        {props.name}
      </button>
    );
  }
};

export default GrayButton;

// 로그아웃, 설정, 목록, 수정, 삭제, 편지쓰기, 보내기, 게임(게임하기, 돌아가기)
// 로고, 역할 태그, 프로필, 프로필 확장,
