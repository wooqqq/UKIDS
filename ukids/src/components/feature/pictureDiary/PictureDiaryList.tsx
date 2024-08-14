import { useEffect, useState } from 'react';
import axios from 'axios';
import { PictureDiaryItem } from './PictureDiaryItem';
import { Link } from 'react-router-dom';

import api from '@/util/api.ts';

import BlueButton from '@components/common/BlueButton';
import './PictureDiaryList.css';
import './diaryItem.css';
//
import ReactFlipPage from 'react-flip-page';

import { useFamilyStore } from '@/stores/familyStore';

import {Pagination} from '@components/feature/pagination/Pagination.tsx';

import { formatDate } from 'date-fns';

interface Diary {
  pictureDiaryId: number;
  familyId: number;
  pictureUrl: string;
  content: string;
  date: string;
}

const PictureDiaryList = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  //   const [totalPage, setTotalPage] = useState<number>();
  //   const [currentPage, setCurrentPage] = useState<number>(1);

  const [diaryDate, setDiaryDate] = useState<string>(formatDate(new Date(), 'yyyy-MM-dd'));

 
  // API 요청
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 플립 페이지 (인덱스는 0부터 시작)
  const [currentPageflip, setCurrentPageflip] = useState(0);

  const {selectedFamilyId} = useFamilyStore();

    // 페이지네이션
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    // 페이지 당 게시글 개수
    const size: number =100 ;
  
    const handlePageChange2 = (page: number) => {
      setPage(page);
    }


  const getDiaryList = async () =>{
    
      // 수정 
      const url = `/picture-diary/all/${selectedFamilyId}?page=${page}&size=${size}`;
      const {data} = await api.get(url);
      console.log(data);
      setDiaries(data.result.pictureDiaries);
      console.log(data.result.totalPage)
      setTotalPage(data.result.totalPage);
  };

  const getDiaryByDate = async () => {
    try{
      const url = `/picture-diary/${selectedFamilyId}?date=${diaryDate}`;
      const {data} = await api.get(url);
      
      setDiaries(data.result.pictureDiaries);
      setTotalPage(data.result.totalPage);

    } catch(error){
      if(axios.isAxiosError(error)){
        alert(error.response?.data.errorMessage)
      }
      setDiaries([]);
      setTotalPage(0);

    }
  }

  // useEffect(() => {
  //   getDiaryList();
  // }, [currentPage]);

  //   //페이지가 변할 때
  //   useEffect(() => {
  //     getDiaryList();
  //   }, [page])

    // date로 불러온다면
    useEffect(() => {
      getDiaryByDate();
    }, [diaryDate])
  

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

      
      {/* 날짜 선택 */}
      <div>
        <input
          type="date"
          value={diaryDate}
          onChange={(e) => setDiaryDate(e.target.value)}
          style={{
            width: '200px', // 너비 조정
            height: '30px', // 높이 조정
            marginLeft: '350px',
            fontSize: '20px', // 글자 크기 조정
            padding: '5px 10px', // 내부 여백 추가
            borderRadius: '15px', // 모서리 둥글게 처리
            fontFamily: 'UhBeejung' // 폰트 
          }}
            />
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
