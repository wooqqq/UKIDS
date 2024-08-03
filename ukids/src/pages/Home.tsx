import Footer from '../components/Footer';
import Header from '../components/Header';
import FeatureBox from '../components/common/FeatureBox';
import Sidebar from '../components/common/Sidebar';

const Home = () => {
  return (
    <>
      <Header />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: '20px'
      }}>
        {/* 메뉴바 */}
        <div style={{
          width: '200px',
          paddingRight: '20px'
        }}>
          <Sidebar />
        </div>

        {/* 콘텐츠 */}
        <div style={{
          flexGrow: 1,
          maxWidth: 'none', // 기본 최대 너비 제한을 없애기
          padding: '0 20px' // 양쪽에 패딩 추가하여 콘텐츠 간격 유지
        }}>
          <FeatureBox />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
