// ScheduleDetail.tsx 일정 상세 컴포넌트
import WhiteButton from '../../common/WhiteButton';
import GrayButton from '../../common/GrayButton';

// const scheduleData = [
//   {
//     scheduleId: 1,
//     familyId: 1,
//     title: '엄마아빠와 XX랜드 나들이',
//     content: '9시에 출발하자~',
//     place: 'XX시 XX구 XX랜드',
//     startTime: '20XX-XX-XX',
//     endTime: '20XX-XX-XX',
//     isDelete: false,
//     createTime: new Date().getTime(),
//     updateTime: null,
//     deleteTime: null,
//   },
//   {
//     scheduleId: 2,
//     familyId: 1,
//     title: '딸기 생일',
//     content: '기념으로 식사 어디서 할지 정해요',
//     place: null,
//     startTime: '20XX-XX-XX',
//     endTime: '20XX-XX-XX',
//     isDelete: false,
//     createTime: new Date().getTime(),
//     updateTime: null,
//     deleteTime: null,
//   },
// ];

// interface scheduleProps {
//   scheduleId: number;
//   familyId: number;
//   title: string;
//   content: string;
//   place: string;
//   startTime: Date;
//   endTime: Date;
//   isDelete: boolean;
//   createTime: Date;
//   updateTime: Date;
//   deleteTime: Date;
// }

const ScheduleDetail = () => {
  return (
    <div>
      <section className="flex justify-between">
        <WhiteButton name="목록" path="/schedule/list" />
        <GrayButton name="수정" path="/schedule/edit/:scheduleId" />
      </section>
      <section>
        <div>
          <label>제목</label>
          <p></p>
        </div>
        <div>
          <label>장소</label>
          <p></p>
        </div>
        <div>
          <label>일시</label>
          <p></p>
        </div>
        <div>
          <label>가족</label>
          <p></p>
        </div>
        <div>
          <label>알림</label>
          <p></p>
        </div>
      </section>
    </div>
  );
};
export default ScheduleDetail;
