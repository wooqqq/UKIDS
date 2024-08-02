import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarBox: React.FC = () => {
  document.addEventListener('DOMContentLoaded', function () {
    let calendarEl: HTMLElement = document.getElementById('calendar')!;

    let calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      // options here
    });

    calendar.render();
  });

  return <></>;
};

export default CalendarBox;
