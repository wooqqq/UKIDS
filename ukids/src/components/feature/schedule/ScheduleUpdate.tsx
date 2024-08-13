import BlueButton from '@/components/common/BlueButton';
import WhiteButton from '@/components/common/WhiteButton';
import api from '@/util/api';
import { useFamilyStore } from '@/stores/familyStore.ts';
import { useState } from 'react';

const ScheduleUpdate = () => {
  let { scheduleId } = useParams() as { scheduleId: string };

  return (
    <div>
      <section className="flex justify-between">
        <WhiteButton name="목록" path="/schedule/list" />
        <BlueButton
          name="등록"
          onClick={callCreateSchedule}
          path="/schedule/detail/:scheduleId"
        />
      </section>
      <section className="px-5 content-center">
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={createForm.title}
            placeholder="제목"
            className="p-2"
            onChange={(e) =>
              setCreateForm({ ...createForm, title: e.target.value })
            }
          />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="place">장소</label>
          <input
            id="place"
            type="text"
            value={createForm.place}
            placeholder="장소"
            className="p-2"
            onChange={(e) =>
              setCreateForm({ ...createForm, place: e.target.value })
            }
          />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="date">시작 날짜</label>
          <input
            id="date"
            type="datetime-local"
            value={createForm.startTime}
            placeholder="시작 날짜"
            className="p-2"
            max={createForm.endTime}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                startTime: e.target.value,
              })
            }
          />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="date">종료 날짜</label>
          <input
            id="date"
            type="datetime-local"
            value={createForm.endTime}
            placeholder="종료 날짜"
            className="p-2"
            min={createForm.startTime}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                endTime: e.target.value,
              })
            }
          />
        </div>
        <div className="mt-3" style={{ borderBottom: '1px solid #ccc' }}>
          <label htmlFor="alert">메모</label>
          <input
            id="content"
            type="text"
            value={createForm.content}
            placeholder="메모할 내용을 입력하세요"
            className="p-2"
            onChange={(e) =>
              setCreateForm({ ...createForm, content: e.target.value })
            }
          />
        </div>
      </section>
    </div>
  );
};
export default ScheduleUpdate;
