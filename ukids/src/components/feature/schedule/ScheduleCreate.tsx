// ScheduleCreate.tsx 일정 등록
import { useNavigate } from 'react-router-dom';
// import BlueButton from '../../common/BlueButton';
import WhiteButton from '../../common/WhiteButton';

const ScheduleCreate = () => {
  const nav = useNavigate();
  // 목록 이동 버튼 이벤트
  const onClickListButton = () => {
    nav('/schedule/list');
  };
  // 일정 상세 버튼 이벤트 (등록 완료 대체ㄴ)
  const onClickDetailButton = () => {
    nav('/schedule/detail/:scheduleId');
  };

  return (
    <div>
      <section className="flex justify-between">
        <WhiteButton name="목록" onClick={onClickListButton} />
        {/* <BlueButton name="등록" onClick={onClickDetailButton} /> */}
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
          <label htmlFor="alert">메모</label>
          <input
            id="content"
            type="text"
            placeholder="메모할 내용을 입력하세요"
          />
        </div>
      </section>
    </div>
  );
};
export default ScheduleCreate;
