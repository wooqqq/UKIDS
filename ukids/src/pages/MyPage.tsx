import MainLayout from '../components/MainLayout';

const MyPage: React.FC = () => {
  return (
    <>
      <MainLayout />
      <div className="text-3xl text-blue-500">
        <h1>마이페이지</h1>
      </div>
    </>
  );
};

export default MyPage;
