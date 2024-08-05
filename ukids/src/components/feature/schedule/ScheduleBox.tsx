import { useScheduleStore } from '../../../stores/scheduleStore';
import { useNavigate } from 'react-router-dom';
import '../../common/common.css';

const ScheduleBox = () => {
  const { selectedDate, eventData } = useScheduleStore();
  const nav = useNavigate();
  const onClickAlbumButton = () => {
    // 앨범 페이지로 이동
    nav('/albums');
  };
  const onClickPaintButton = () => {
    // 그림일기 페이지로 이동
    nav('/paintdiary');
  };

  const onClickScheduleListButton = () => {
    //  일정 리스트 조회 페이지로 이동
    nav('/schedule/list');
  };
  return (
    <>
      <h1 className="title-style">{selectedDate}</h1>
      <section className="flex justify-between mt-8">
        <button className="half-pre-box" onClick={onClickAlbumButton}>
          <div>앨범</div>
          <div>
            <img src="#" alt="앨범 이미지" />
          </div>
          <button>앨범 페이지 이동</button>
        </button>
        <button className="half-pre-box" onClick={onClickPaintButton}>
          <div>그림일기</div>
          <div>
            <img src="#" alt="그림일기 이미지" />
            <button>그림일기 페이지 이동</button>
          </div>
        </button>
      </section>
      <section className="pre-box mt-8">
        <div>일정</div>
        <button onClick={onClickScheduleListButton}>더보기</button>

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
      </section>
    </>
  );
};

export default ScheduleBox;
