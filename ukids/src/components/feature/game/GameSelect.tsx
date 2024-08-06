import WhiteButton from '../../../components/common/WhiteButton';
import GameButton from './GameButton';
import { useNavigate } from 'react-router-dom';

const GameSelect = () => {
  const nav = useNavigate();
  const onClickScheduleButton = () => {
    nav('/schedule');
  };
  const onClickCreateButton = () => {
    nav('/schedule/new');
  };

  return (
    <>
      <h1>게임</h1>
      <GameButton />
      <div className="schedule-box">
        <section className="flex justify-between">
          <WhiteButton name="이전" onClick={onClickScheduleButton} />
          <button className="plus-btn" onClick={onClickCreateButton}></button>
        </section>
      </div>
    </>
  );
};

export default GameSelect;
