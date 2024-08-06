import { useNavigate } from 'react-router-dom';
import '../components/feature/game/game.css';
import quizImg from '../assets/game_quiz.png';
import callmynameImg from '../assets/game_callmyname.png';

const Game = () => {
  const nav = useNavigate();
  const onQuizClick = () => {
    nav('/game/quiz');
  };
  const onCallMyNameClick = () => {
    nav('/game/callMyName');
  };

  return (
    <>
      <button onClick={onQuizClick}>
        <img
          src={quizImg}
          alt="QuizButton"
          className="half-feature-box hover:border-solid border-8 border-[#FFBF33]"
        />
      </button>
      <button onClick={onCallMyNameClick}>
        <img
          src={callmynameImg}
          alt="QuizButton"
          className="half-feature-box hover:border-solid border-8 border-[#9F6AD5]"
        />
      </button>
    </>
  );
};

export default Game;
