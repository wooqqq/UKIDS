import Footer from '../components/Footer';
import Header from '../components/Header';
import CalendarBox from '../components/feature/calendar/CalendarBox';

const Schedule: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-layout">
        {/* 메뉴바 */}
        {/* 콘텐츠 */}
        <CalendarBox />
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
