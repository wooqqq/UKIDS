import MainLayout from '../components/MainLayout';
import GrayButton from '../components/common/GrayButton';

const Home = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const num: number = 1234;

  return (
    <>
      <MainLayout />
      <div className="text-3xl text-blue-500">Hello World!</div>
      <div>{API_KEY}</div>
      <div>{num}</div>

      <GrayButton name="마이페이지" path="/user" />
      <GrayButton name="가족대화방" path="/chat-room" />
    </>
  );
};

export default Home;
