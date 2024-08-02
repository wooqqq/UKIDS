import Footer from '../components/Footer';
import Header from '../components/Header';
import Calendar from '../components/feature/calendar/CalendarBox';

const Schedule: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-layout">
        {/* 메뉴바 */}
        {/* 콘텐츠 */}
        <Calendar />
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
