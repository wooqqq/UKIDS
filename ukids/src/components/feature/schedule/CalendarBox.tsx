import FullCalendar from '@fullcalendar/react'; // FullCalendar React component
import dayGridPlugin from '@fullcalendar/daygrid'; // DayGrid 플러그인 (달력에 날짜를 표시하는 데 사용)
import interactionPlugin from '@fullcalendar/interaction'; // 상호작용 플러그인 (클릭 등의 이벤트 처리를 위해 필요)
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 (날짜 형식 및 텍스트를 한국어로 표시)
import { DateClickArg } from '@fullcalendar/interaction'; // DateClickArg 타입 (날짜 클릭 이벤트의 정보 타입)
import { useScheduleStore } from '../../../stores/scheduleStore'; // zustand를 사용한 상태 관리 store
import { useEffect } from 'react'; // React의 useEffect 훅
import './schedule.css'; // CSS 스타일 파일

interface CalendarBoxProps {
  onDateClick?: () => void;
  height?: string;
}

export default function CalendarBox({
  onDateClick,
  height = '550px',
}: CalendarBoxProps) {
  // zustand store에서 상태와 상태 업데이트 함수 가져오기
  const { events, setEvents, setSelectedDate, setEventData } =
    useScheduleStore();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 호출되는 비동기 함수
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events'); // 실제 API URL로 변경
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data); // 상태 업데이트 (이벤트 데이터를 store에 저장)

        // 오늘 날짜 설정
        const today = new Date();
        const formattedToday = formatDate(today); // 오늘 날짜 포맷팅
        setSelectedDate(formattedToday);

        // 오늘 날짜의 이벤트 필터링
        const todayISOString = today.toISOString().split('T')[0];
        const todayEvents = data.filter((event: any) => {
          const eventStart = new Date(event.start).toISOString().split('T')[0];
          const eventEnd = new Date(event.end || event.start)
            .toISOString()
            .split('T')[0];
          return todayISOString >= eventStart && todayISOString <= eventEnd;
        });

        setEventData(todayEvents.length > 0 ? todayEvents : null); // 필터링된 이벤트를 store에 저장
      } catch (error) {
        console.error('Error fetching events:', error); // 오류 처리
      }
    };

    fetchEvents(); // API 호출
  }, [setEvents, setSelectedDate, setEventData]); // setEvents, setSelectedDate, setEventData가 변경될 때마다 이 useEffect가 실행됨

  // 클릭한 날짜에 해당하는 이벤트를 찾아서 설정하는 함수
  const handleDateClick = (info: DateClickArg) => {
    const date = new Date(info.dateStr); // 클릭한 날짜를 문자열로 가져옴
    const formattedToday = formatDate(date); // 오늘 날짜 포맷팅
    setSelectedDate(formattedToday);

    // 클릭한 날짜에 해당하는 이벤트를 필터링
    const eventData = events.filter((event) => {
      const eventStart = new Date(event.start).toISOString().split('T')[0];
      const eventEnd = new Date(event.end || event.start)
        .toISOString()
        .split('T')[0];
      return info.dateStr >= eventStart && info.dateStr <= eventEnd;
    });

    setEventData(eventData.length > 0 ? eventData : null); // 필터링된 이벤트를 store에 저장

    if (onDateClick) onDateClick();
  };

  // 일정 이벤트
  // const events = [
  //   {
  //     title: '할머니할아버지와 제주도 여행!',
  //     allDay: true,
  //     // date: '2024-08-01', // 시작 일자로 사용 가능
  //     start: '2024-08-01', // 시작 일자
  //     end: '2024-08-05', // 끝나는 일자 -> 표시는 전날까지 됨
  //     // backgroundColor: '#FFBF33', // 배경색
  //     // borderColor: '#FFBF33', // 테두리색
  //     color: '#FFBF33', // 배경, 테두리색 모두
  //     textColor: '#fff', // 글자 색상 (우리는 흰색 고정)
  //   },
  //   {
  //     title: '할머니할아버지와 제주도 여행!',
  //     allDay: true,
  //     // date: '2024-08-01', // 시작 일자로 사용 가능
  //     start: '2024-08-01', // 시작 일자
  //     end: '2024-08-05', // 끝나는 일자 -> 표시는 전날까지 됨
  //     // backgroundColor: '#FFBF33', // 배경색
  //     // borderColor: '#FFBF33', // 테두리색
  //     color: '#FFBF33', // 배경, 테두리색 모두
  //   },
  //   {
  //     title: '딸기 생일🍓',
  //     allDay: true,
  //     start: '2024-08-08', // 시작 일자
  //     // end: '2024-08-08', // 끝나는 일자 -> 표시는 전날까지 됨
  //     color: '#F6AEEF',
  //   },
  // ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // 사용할 플러그인 설정
        initialView="dayGridMonth" // 초기 뷰를 월간 뷰로 설정
        locale={koLocale} // 한국어 로케일 설정
        firstDay={0} // 주의 시작 요일을 일요일(0)로 설정
        weekends={true} // 주말을 표시
        fixedWeekCount={false} // 고정된 주 수를 사용하지 않음
        height={height} // 캘린더의 높이 설정 - 여기에서 height props 사용
        customButtons={{
          createButton: {
            text: '일정 추가하기',
          },
        }}
        selectable={true} // 날짜 선택 기능 활성화
        headerToolbar={{
          start: 'title', // 툴바의 시작 부분에 제목 표시
          end: 'today, prev,next', // 툴바의 끝 부분에 이전/다음 버튼 표시
        }}
        eventTextColor="#fff" // 이벤트 텍스트 색상 설정
        titleFormat={function (date) {
          const year = date.date.year;
          const month = date.date.month + 1; // 월은 0부터 시작하므로 +1
          return `${year}년 ${month}월`; // 제목 포맷 (예: 2024년 8월)
        }}
        dayCellContent={(arg) => {
          return arg.date.getDate().toString(); // 날짜 셀의 내용으로 날짜 숫자만 표시
        }}
        dateClick={handleDateClick} // 날짜 클릭 이벤트 핸들러
        events={events} // 캘린더에 표시할 이벤트 목록
      />
    </div>
  );
}
