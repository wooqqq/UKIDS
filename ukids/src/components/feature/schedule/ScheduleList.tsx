import { useEffect } from 'react';
import { useScheduleStore } from '@/stores/scheduleStore';
import { useNavigate } from 'react-router-dom';
import WhiteButton from '../../common/WhiteButton';
import '../../common/common.css';
import { useFamilyStore } from '@/stores/familyStore.ts';

const ScheduleList = () => {
  const { selectedFamilyId } = useFamilyStore();

  const {
    selectedDate,
    setSelectedDate,
    dateScheduleList,
    setDateScheduleList,
    setScheduleDetail,
  } = useScheduleStore();
  const nav = useNavigate();
  const onClickCreateButton = () => {
    // 스케줄 등록 페이지로 이동
    nav('/schedule/new');
  };
  const onClickDetail = (scheduleId: number) => {
    console.log('list schedule id : ', scheduleId);
    if (scheduleId) {
      setScheduleDetail(scheduleId);
      nav(`/schedule/detail`);
    }
  };

  useEffect(() => {
    setDateScheduleList(selectedDate, selectedFamilyId);
    console.log('date schedule : ', dateScheduleList);
  }, [selectedDate, selectedFamilyId, setSelectedDate]);

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
          {dateScheduleList && dateScheduleList.scheduleList ? (
            dateScheduleList.scheduleList.map((value, index) => (
              <div key={index} onClick={() => onClickDetail(value.scheduleId)}>
                <p>
                  <div className="circle-color"></div>
                  {value.title}
                </p>
                <p>장소: {value.place}</p>
                <p>시작 날짜: {value.startTime.split('T').join(' ')}</p>
                <p>끝 날짜: {value.endTime.split('T').join(' ')}</p>
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
