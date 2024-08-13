// ScheduleDetail.tsx 일정 상세 컴포넌트
import WhiteButton from '../../common/WhiteButton';
import GrayButton from '../../common/GrayButton';
import { useScheduleStore } from '@/stores/scheduleStore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ScheduleDetail = () => {
  const { scheduleDetail, setScheduleDetail, getScheduleDetail } =
    useScheduleStore();
  // let { scheduleId } = useParams();

  useEffect(() => {
    // console.log('schedule detail id : ', scheduleId);
    // if (scheduleId) setScheduleDetail(scheduleId);
    console.log('schedules : ', getScheduleDetail);
  }, []);

  return (
    <div>
      <section className="flex justify-between">
        <WhiteButton name="목록" path="/schedule/list" />
        <GrayButton name="수정" path="/schedule/edit/{scheduleId}" />
      </section>
      <section className="px-5 content-center">
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label>제목</label>
          <p className="p-2">{scheduleDetail.title}</p>
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label>장소</label>
          <p className="p-2">{scheduleDetail.place}</p>
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label>시작 일시</label>
          <p className="p-2">{scheduleDetail.startTime}</p>
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label>종료 일시</label>
          <p className="p-2">{scheduleDetail.endTime}</p>
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label>메모</label>
          <p className="p-2">{scheduleDetail.content}</p>
        </div>
      </section>
    </div>
  );
};
export default ScheduleDetail;
