import AlbumPreBox from '../components/feature/albums/AlbumPreBox';
import PaintPreBox from '../components/feature/diary/PaintPreBox';
import CalendarBox from '../components/feature/schedule/CalendarBox';
import ScheduleList from '../components/feature/schedule/ScheduleList';
import '../components/feature/schedule/schedule.css';

const Schedule = () => {
  return (
    <>
      <div className="half-feature-box">
        <CalendarBox />
      </div>
      <div className="half-feature-box items-center">
        <div className="flex justify-between">
          <AlbumPreBox />
          <PaintPreBox />
        </div>
        <ScheduleList />
      </div>
    </>
  );
};

export default Schedule;
