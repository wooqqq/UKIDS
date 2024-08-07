import WhiteButton from '../../../components/common/WhiteButton';
import GameButton from './GameButton';
import { useNavigate } from 'react-router-dom';

const GameSelect = () => {
  const nav = useNavigate();
  const onClickCreateButton = () => {
    nav('/schedule/new');
  };

  return (
    <>
      <h1>게임</h1>
      <GameButton />
      <div className="schedule-box">
        <section className="flex justify-between">
          <WhiteButton name="이전" path="/schedule" />
          <button className="plus-btn" onClick={onClickCreateButton}></button>
        </section>
      </div>
    </>
  );
};

export default GameSelect;
