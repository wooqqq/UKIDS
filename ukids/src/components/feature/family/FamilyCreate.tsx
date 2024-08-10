import { useNavigate } from 'react-router-dom';
import BlueButton from '../../common/BlueButton';

const FamilyCreate = () => {
  return (
    <div className="common-feature-box w-[1000px] h-[576px]">
      <p className="big-title-style text-center text-[#FFBF33]">
        가족방 만들기
      </p>

      <form className="join-form">
        {/* <label htmlFor="id">가족방 이름</label> */}
        <input
          type="text"
          id="id"
          placeholder="가족방 이름"
          className="input-box px-5 font-semibold text-[#555555]"
        />
        {/* <label htmlFor="name">가족방 비밀번호</label> */}
        <input
          type="password"
          id="familypw"
          placeholder="가족방 비밀번호"
          className="input-box px-5 font-semibold text-[#555555]"
        />
        {/* <label htmlFor="familypwConfirm">비밀번호 확인</label> */}
        <input
          type="password"
          id="familypwConfirm"
          placeholder="가족방 비밀번호 확인"
          className="input-box px-5 font-semibold text-[#555555]"
        />
        <BlueButton name="만들기" type="submit" path="" />
      </form>
    </div>
  );
};

const FamilyCreateButton = () => {
  const nav = useNavigate();
  const onClickFamilyCreateButton = () => {
    nav('create');
  };

  return (
    <button
      onClick={onClickFamilyCreateButton}
      className="common-feature-box w-[400px] h-[480px] mt-11"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="158"
          height="158"
          viewBox="0 0 158 158"
          fill="none"
        >
          <path
            d="M81.4688 29.625C82.7783 29.625 84.0341 30.1452 84.9601 31.0712C85.8861 31.9971 86.4062 33.253 86.4062 34.5625V71.5938H123.438C124.747 71.5938 126.003 72.1139 126.929 73.0399C127.855 73.9659 128.375 75.2217 128.375 76.5312V81.4688C128.375 82.7783 127.855 84.0341 126.929 84.9601C126.003 85.8861 124.747 86.4062 123.438 86.4062H86.4062V123.438C86.4062 124.747 85.8861 126.003 84.9601 126.929C84.0341 127.855 82.7783 128.375 81.4688 128.375H76.5312C75.2217 128.375 73.9659 127.855 73.0399 126.929C72.1139 126.003 71.5938 124.747 71.5938 123.438V86.4062H34.5625C33.253 86.4062 31.9971 85.8861 31.0712 84.9601C30.1452 84.0341 29.625 82.7783 29.625 81.4688V76.5312C29.625 75.2217 30.1452 73.9659 31.0712 73.0399C31.9971 72.1139 33.253 71.5938 34.5625 71.5938H71.5938V34.5625C71.5938 33.253 72.1139 31.9971 73.0399 31.0712C73.9659 30.1452 75.2217 29.625 76.5312 29.625H81.4688Z"
            fill="#555555"
            fill-opacity="0.4"
          />
        </svg>
      </div>
      <div className="big-title-style">가족방 만들기</div>
    </button>
  );
};

export { FamilyCreate, FamilyCreateButton };
