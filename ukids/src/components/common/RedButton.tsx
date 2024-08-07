// 가족해체(red, big) 등 부정
// 가족채팅방 연결끊기 이미지 추가
import { useNavigate } from 'react-router-dom';
import './button.css';
import discallIcon from '../../assets/subway_call-3.png';

interface RedButtonProps {
  name: string;
  path: string;
  className?: string;
  type?: string;
}

const RedButton = (props: RedButtonProps) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(props.path);
  };

  return (
    <button onClick={handleClick} className="common-btn red-btn">
      {props.name == '연결끊기' ? (
        <img src={discallIcon} alt="call-icon" />
      ) : null}
      {props.name}
    </button>
  );
};

export default RedButton;
