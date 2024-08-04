import { useStore } from '../../../stores/scheduleStore';
import '../../common/common.css';

export default function ScheduleList() {
  const { selectedDate, eventData } = useStore();

  return (
    <div className="pre-box">
      {selectedDate && (
        <div className="schedule-list">
          <h3>{selectedDate}</h3>
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
}
