import { useEffect, useState } from 'react';

import { PictureDiaryItem } from './PictureDiaryItem';
import { Link } from 'react-router-dom';

import { useFamilyStore } from '@/stores/familyStore';

import api from '@/util/api.ts';

import BlueButton from '@components/common/BlueButton';
import './PictureDiaryList.css';
import './diaryItem.css';
//
import ReactFlipPage from 'react-flip-page';

interface Diary {
  pictureDiaryId: number;
  familyId: number;
  pictureUrl: string;
  content: string;
  date: string;
}

const PictureDiaryList = () => {

  const {selectedFamilyId} = useFamilyStore();


  const [diaries, setDiaries] = useState<Diary[]>([]);
  //   const [totalPage, setTotalPage] = useState<number>();
  //   const [currentPage, setCurrentPage] = useState<number>(1);

  // API 요청
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 플립 페이지 (인덱스는 0부터 시작)
  const [currentPageflip, setCurrentPageflip] = useState(0);

  const getDiaryList = async () => {
    // 수정
    const url = `/picture-diary/all/${selectedFamilyId}?page=${currentPage}&size=10`;
    const { data } = await api.get(url);
    setDiaries(data.result.pictureDiaries);
  };

  useEffect(() => {
    getDiaryList();
  }, [currentPage]);

  // FlipPage 컨트롤 변경 시 API 페이지도 업데이트
  const handlePageChange = (pageNumber: number) => {
    setCurrentPageflip(pageNumber);
    setCurrentPage(pageNumber); // 이를 API 요청 페이지 상태에도 반영
  };

  return (
    <div>
      {/* 메인 오른쪽 만들기 버튼 */}
      <div style={{ marginLeft: '764px', marginTop: '33px' }}>
        <BlueButton name=" 만들기 " path="/paintdiary/write" />
      </div>

      {/* 메인 왼쪽 글자 */}
      <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333]">
        그림일기
      </div>

      {/* <div><Link to={`/paintdiary/write`}>만들기</Link></div> */}

      {/* 이하 영역 */}

      <div className="paints-container">
        <div>
          <ReactFlipPage
            width={650}
            height={400}
            orientation="horizontal"
            uncutPages
            showSwipeHint
            className="flip-page-container"
            page={currentPageflip}
            onPageChange={handlePageChange}
          >
            {diaries.map((diary, index) => (
              <div key={index} className="flip-page">
                <div className="left-page">
                  <img src={diary.pictureUrl} alt="" className="diary-image" />
                </div>

                <div className="right-page">
                  <div className="paint-item-date">{diary.date}</div>
                  <div className="paint-item-content">{diary.content}</div>
                  <Link
                    to={`/paintdiary/${diary.pictureDiaryId}`}
                    className="view-details"
                  >
                    🔍︎
                  </Link>
                </div>
              </div>
            ))}
          </ReactFlipPage>

          {/* <div className="page-selector">
                  {diaries.map((_, index) => (
                    <button key={index} onClick={() => handlePageChange(index)}>
                      {index + 1}
                    </button>
                  ))}
                </div> */}

          {/*         
        {diaries.map((item) => (
          <Link to={`/paintdiary/${item.pictureDiaryId}`} className="paint-item">
            <PictureDiaryItem
              key={item.pictureDiaryId}
              pictureUrl={item.pictureUrl}
              content={item.content}
              date={item.date}
            />
          </Link>
        ))}
     */}
        </div>
      </div>
    </div>
  );
};

export default PictureDiaryList;
