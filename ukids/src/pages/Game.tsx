import { Route, Routes } from 'react-router-dom';
import GameSelect from '../components/feature/game/GameSelect';
import '../components/feature/game/Game.css';

const Game = () => {
  return (
    <>
      <div className="half-feature-box">
        <GameSelect />
      </div>
      <div className="half-feature-box items-center">
        <Routes>
          <Route path="" element={<GameSelect />} />
        </Routes>
      </div>
    </>
  );
};

export default Game;
