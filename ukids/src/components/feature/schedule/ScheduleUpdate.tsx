import BlueButton from '../../common/BlueButton';
import WhiteButton from '../../common/WhiteButton';

const ScheduleUpdate = () => {
  return (
    <div>
      <section className="flex justify-between">
        <WhiteButton name="목록" path="/schedule/list" />
        <BlueButton name="등록" path="/schedule/detail/:scheduleId" />
      </section>
      <section className="px-5 content-center">
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="title">제목</label>
          <input id="title" type="text" placeholder="제목" className="p-2" />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="place">장소</label>
          <input id="place" type="text" placeholder="장소" className="p-2" />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="date">날짜</label>
          <input id="date" type="text" placeholder="날짜" className="p-2" />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="family">가족</label>
          <input id="family" type="text" placeholder="가족" className="p-2" />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="alert">메모</label>
          <input
            id="content"
            type="text"
            placeholder="메모할 내용을 입력하세요"
            className="p-2"
          />
        </div>
      </section>
    </div>
  );
};
export default ScheduleUpdate;
