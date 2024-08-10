import { useEffect } from 'react';
import { useScheduleStore } from '../../../stores/scheduleStore';
import { useNavigate } from 'react-router-dom';
import WhiteButton from '../../common/WhiteButton';
import '../../common/common.css';

// 날짜 포맷팅 함수
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

const ScheduleList = () => {
  const { events, selectedDate, setSelectedDate, eventData, setEventData } =
    useScheduleStore();
  const nav = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 오늘 날짜와 해당 날짜의 이벤트 데이터를 설정
    const today = new Date();
    const formattedToday = formatDate(today);
    setSelectedDate(formattedToday);

    // 오늘 날짜에 해당하는 이벤트 필터링
    const todayStr = today.toLocaleDateString('sv-SE'); // 로컬 시간을 기준으로 날짜를 "YYYY-MM-DD" 형식으로 변환
    const todayEvents = events.filter((event) => {
      const eventStart = new Date(event.start).toLocaleDateString('sv-SE');
      const eventEnd = new Date(event.end || event.start).toLocaleDateString(
        'sv-SE',
      );
      return todayStr >= eventStart && todayStr <= eventEnd;
    });

    setEventData(todayEvents.length > 0 ? todayEvents : null);
  }, [events, setSelectedDate, setEventData]);

  const onClickCreateButton = () => {
    // 스케줄 등록 페이지로 이동
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
          <p className="title-style mt-3">{selectedDate}</p>{' '}
          {/* 선택된 날짜를 출력 */}
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
            <p className="mt-2" style={{ color: '#999' }}>
              해당 날짜에 일정이 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
