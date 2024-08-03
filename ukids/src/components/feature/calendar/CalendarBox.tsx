import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      fixedWeekCount={false}
      events={[
        {
          title: '할머니할아버지와 제주도 여행!',
          // date: '2024-08-01',
          allDay: true,
          start: '2024-08-01', // 시작 일자
          end: '2024-08-05', // 끝나는 일자 -> 표시는 전날까지 됨
          // backgroundColor: '#FFBF33', // 배경색
          // borderColor: '#FFBF33', // 테두리색
          color: '#FFBF33', // 배경, 테두리색 모두
          textColor: '#fff', // 글자 색상 (우리는 흰색 고정)
        },
        {
          title: '딸기 생일🍓',
          // date: '2024-08-01',
          allDay: true,
          start: '2024-08-08', // 시작 일자
          // end: '2024-08-08', // 끝나는 일자 -> 표시는 전날까지 됨
          color: '#F6AEEF',
          textColor: '#fff',
        },
      ]}
    />
  );
}
