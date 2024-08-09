// 가족채팅방 연결하기 이미지 추가
import { useNavigate } from 'react-router-dom';
import './button.css';

interface BlueButtonProps {
  name: string;
  path: string;
  className?: string;
  type?: string;
}

const BlueButton = (props: BlueButtonProps) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(props.path);
  };

  if (props.name == '로그인' || props.name == '회원가입') {
    return (
      <button onClick={handleClick} className="common-btn blue-btn login-btn">
        {props.name}
      </button>
    );
  } else {
    return (
      <button onClick={handleClick} className="common-btn blue-btn">
        {props.name}
      </button>
    );
  }
};

export default BlueButton;
