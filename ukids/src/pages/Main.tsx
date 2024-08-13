import { useNavigate } from 'react-router-dom';
import LetterBox from '../components/feature/letter/LetterBox';
import FamilyTree from '../components/feature/family/FamilyTree';
import CalendarBox from '../components/feature/schedule/CalendarBox';
// import { useScheduleStore } from '../stores/scheduleStore';

const Main = () => {
  const nav = useNavigate();
  // const { setSelectedDate } = useScheduleStore();

  const onClickScheduleBox = () => {
    // 오늘 날짜로 넘어감
    // const today = new Date();
    // const formattedToday = `${today.getFullYear()}년 ${
    //   today.getMonth() + 1
    // }월 ${today.getDate()}일`;
    // setSelectedDate(formattedToday);
    nav('/schedule');
  };

  return (
    <>
      {/* 나무 부분 */}
      <section className="w-[470px] h-[576px] p-[15px] relative">
        <FamilyTree />
      </section>
      {/* 캘린더 & 편지함 부분 */}
      <section className="w-[409px]">
        <div className="main-page common-feature-box mb-[19px] p-[15px] h-[404px]">
          <CalendarBox onDateClick={onClickScheduleBox} height="374px" />
        </div>
        <div className="common-feature-box h-[153px] p-[15px]">
          <LetterBox path="/letters" />
        </div>
      </section>
    </>
  );
};

export default Main;
