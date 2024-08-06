import BlueButton from '../../common/BlueButton';
import WhiteButton from '../../common/WhiteButton';

const ScheduleUpdate = () => {
  return (
    <div>
      <section className="flex justify-between">
        <WhiteButton name="목록" path="/schedule/list" />
        <BlueButton name="등록" path="/schedule/detail/:scheduleId" />
      </section>
      <section>
        <div>
          <label htmlFor="title">제목</label>
          <input id="title" type="text" placeholder="제목" />
        </div>
        <div>
          <label htmlFor="place">장소</label>
          <input id="place" type="text" placeholder="장소" />
        </div>
        <div>
          <label htmlFor="date">일시</label>
          <input id="date" type="text" placeholder="일시" />
        </div>
        <div>
          <label htmlFor="family">가족</label>
          <input id="family" type="text" placeholder="가족" />
        </div>
        <div>
          <label htmlFor="alert">알림</label>
          <input id="alert" type="text" placeholder="알림" />
        </div>
      </section>
    </div>
  );
};
export default ScheduleUpdate;
