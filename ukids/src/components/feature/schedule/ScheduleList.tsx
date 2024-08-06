import { useScheduleStore } from '../../../stores/scheduleStore';
import { useNavigate } from 'react-router-dom';
import WhiteButton from '../../common/WhiteButton';
import '../../common/common.css';

const ScheduleList = () => {
  const { selectedDate, eventData } = useScheduleStore();
  const nav = useNavigate();
  const onClickCreateButton = () => {
    //  스케줄 등록 페이지로 이동
    nav('/schedule/new');
  };
  return (
    <div className="schedule-box">
      <section className="flex justify-between">
        <WhiteButton name="이전" path="/schedule" />
        <button className="plus-btn" onClick={onClickCreateButton}>
          +
        </button>
      </section>
      {selectedDate && (
        <div className="schedule-list">
          {eventData ? (
            eventData.map((event, index) => (
              <div key={index}>
                <p>
                  <div className="circle-color"></div>
                  {event.title}
                </p>
                {/* <p>시작 날짜: {event.start}</p> */}
                {/* {event.end && <p>끝 날짜: {event.end}</p>} */}
              </div>
            ))
          ) : (
            <p>해당 날짜에 이벤트가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
