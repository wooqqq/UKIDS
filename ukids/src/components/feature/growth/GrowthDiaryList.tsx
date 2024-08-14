import { useEffect, useState } from "react";
import api from "@/util/api.ts";
import { Link, useParams } from "react-router-dom";
import { GrowthDiaryItem } from "@/components/feature/growth/GrowthDiaryItem";

import BlueButton from "@components/common/BlueButton";
import WhiteButton from '@components/common/WhiteButton';

import { Modal } from "@components/feature/modal/Modal";
import { useNavigate } from "react-router-dom";

import {Pagination} from '@components/feature/pagination/Pagination.tsx';


import './GrowthDiaryList.css'

interface Diary{
    recordId: number;
    writerId: number;

    // 수정: 제목 string
    title: string;

    // 수정: 내용 string
    content: string;
    date: string;
    imageUrl: string;
}


// // 추가  : 폴더 정보 

// interface Folder {
//     folderId: 21;
//     folderName: string;
// }




export const GrowthDiaryList = () => {
    const {folderId} = useParams();



    const [modalState, setModalState] = useState<boolean>(false);
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const content = "성장일지 폴더 삭제";
    const navigate = useNavigate();

    // 페이지네이션
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const size: number = 5;

    const handlePageChange = (page: number) => {
        setPage(page);
    }


    const getDiaryList = async () => {
        // console.log('folderId: ', folderId);
        const url = `/growth-record/all/${folderId}?page=${page}&size=${size}`;

        const {data} = await api.get(url);

        console.log(data.result);
        console.log("강경민")
        setDiaries(data.result.growthRecords);
        setTotalPage(data.result.totalPage);
    }

    const onModalOpen = () => {
        setModalState(!modalState);
    }

    const deleteFolder = async () => {
        if(diaries.length !== 0){
            alert('삭제되지 않은 성장일지가 존재합니다.');
            return;
        }
        const url = `/growth-folder/${folderId}`;

        const {data} = await api.delete(url)

        console.log(data);
        navigate(`/growthfolder`);

    }




    

    

    useEffect(() => {
        getDiaryList();



    }, [folderId, page])


    return (
        <div className="feature-box">


                {/* 목록 */}
                <div style={{ position: 'absolute', top: '27px', left: '30px' }}>
                    <WhiteButton name="폴더 목록" path="/growthfolder"/>
                </div>

                {/* 제목 */}
                <div className="absolute left-[342px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">
                    (폴더이름) 성장 일지
                </div> 

                
                {/*만들기*/}
                <div style={{ marginLeft: '664px', marginTop: '27px' }}>
                    <BlueButton name="만들기" path={`/growthdiary/write/${folderId}`} />
                </div>


                {/* 삭제 */}
                <span className="home-modal-open-Button" onClick={onModalOpen}>
                    <button className="common-btn red-font" style={{ position: 'absolute', top: '27px', right: '30px' }}>
                    폴더 삭제
                    </button>
                </span>




            
            {/* 게시글 없을 때 */}
            {diaries.length === 0 ? (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">아직 성장일지가 없어요!<br/>성장일지를 만들러 가볼까요?</div>
            ) : (
            <div className="diary-grid-container">
                {diaries.map((item) => (
                    // 수정: 현재의 폴더 아이디도 함께 전달
                    <Link to={`/growthdiary/diary/${item.recordId}?folderId=${folderId}`}>
                        <GrowthDiaryItem className="growth-diary-item"
                        key={item.recordId} title={item.title} date={item.date} imageUrl={item.imageUrl}/>
                    </Link>
                ))}
            </div>
            
            
    
            )}

            <div>
                {modalState && (
                    <Modal content={content} modalState={modalState} setModalState={setModalState} deleteElement={deleteFolder}/>
                )}
            </div>








                
            {/* <BlueButton name="만들기" path={`/growthdiary/write/${folderId}`} /> */}
            {/* <BlueButton name="폴더 삭제" path="/" onClick={onModalOpen}/> */}



            <Pagination
                totalPage={totalPage}
                size={size}
                countPerPage={5}
                currentPage={page}
                onPageChange={handlePageChange} // onPageChange 핸들러를 호출하도록 수정
            />
            {/* <p style={{ fontSize: '24px', textAlign: 'center' }}>1 2 3 4</p> */}
        </div>
        
    )
}