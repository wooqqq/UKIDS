import './button.css';

interface BlueButtonProps {
  name: string;
  onClick?: () => void; // onClick 프로퍼티 추가
}

const BlueButton = (props: BlueButtonProps) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(); // 전달된 onClick 함수 호출
    }
  };

  if (props.name == '연결하기') {
    return (
      <button onClick={handleClick} className="common-btn green-btn">
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
