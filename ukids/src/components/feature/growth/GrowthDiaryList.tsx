import { useEffect, useState } from 'react';
import api from '@/util/api.ts';
import { Link, useParams } from 'react-router-dom';
import { GrowthDiaryItem } from '@/components/feature/growth/GrowthDiaryItem';
import BlueButton from '@components/common/BlueButton';
import { Modal } from '@components/feature/modal/Modal';
import { useNavigate } from 'react-router-dom';

interface Diary {
  recordId: number;
  writerId: number;
  title: number;
  content: number;
  date: string;
  imageUrl: string;
}

export const GrowthDiaryList = () => {
  const { folderId } = useParams();
  const [modalState, setModalState] = useState<boolean>(false);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const content = '성장일지 폴더 삭제';
  const navigate = useNavigate();

  const getDiaryList = async () => {
    // console.log('folderId: ', folderId);
    const url = `/growth-record/all/${folderId}?size=10`;

    const { data } = await api.get(url);

    console.log(data.result);
    setDiaries(data.result.growthRecords);
  };

  const onModalOpen = () => {
    setModalState(!modalState);
  };

  const deleteFolder = async () => {
    if (diaries.length !== 0) {
      alert('삭제되지 않은 성장일지가 존재합니다.');
      return;
    }
    const url = `/growth-folder/${folderId}`;

    const { data } = await api.delete(url);

    console.log(data);
    navigate(`/growthfolder`);
  };

  useEffect(() => {
    getDiaryList();
  }, []);

  return (
    <div>
      <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
      </div>
      <div className="absolute left-[764px] top-[23px]">
        <BlueButton name="만들기" path={`/growthdiary/write/${folderId}`} />
        <BlueButton name="폴더삭제" path="/" onClick={onModalOpen} />
      </div>
      <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">
        성장일지
      </div>

      {diaries.length === 0 ? (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">
          아직 성장일지가 없어요!
          <br />
          성장일지를 만들러 가볼까요?
        </div>
      ) : (
        <div className="relative mt-40">
          {diaries.map((item) => (
            <Link to={`/growthdiary/diary/${item.recordId}`}>
              <GrowthDiaryItem
                key={item.recordId}
                title={item.title}
                date={item.date}
                imageUrl={item.imageUrl}
              />
            </Link>
          ))}
        </div>
      )}

      <div>
        {modalState && (
          <Modal
            content={content}
            modalState={modalState}
            setModalState={setModalState}
            deleteElement={deleteFolder}
          />
        )}
      </div>
    </div>
  );
};
