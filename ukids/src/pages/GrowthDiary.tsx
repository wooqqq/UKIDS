// import { useState, EventHandler, ReactNode } from 'react';
import { useEffect, useState } from "react";
import BlueButton from "../components/common/BlueButton";
// import { useNavigate } from 'react-router-dom';
import {GrowthFolderCreateModal} from "@components/feature/growth/GrowthFolderCreateModal";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { GrowthDiaryList } from "@/components/feature/growth/GrowthDiaryList";
import { GrowthDiaryDetail } from "@/components/feature/growth/GrowthDiaryDetail";
import { GrowthDiaryCreate } from "@/components/feature/growth/GrowthDiaryCreate";
import { GrowthDiaryUpdate } from "@/components/feature/growth/GrowthDiaryUpdate";
const GrowthDiary = () => {
  const [modalState, setModalState] = useState<boolean>(false);

  // const { folderId } = useParams();
  const [folderId, setFolderId] = useState<string>();

  const onModalOpen = () => {
    setModalState(!modalState);
  }

  useEffect(() => {
    console.log('path: ', location.pathname)
    const segments = location.pathname.split('/').filter(Boolean);
    setFolderId(segments[segments.length - 1]);
  }, [])


  return (
    <div className="relative w-[911px] h-[576px] ">
      {/* <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">


        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
      </div>
      <div className="absolute left-[764px] top-[23px]">
         <BlueButton name="만들기" path={`/growthdiary/write/${folderId}`} />
      </div>
      <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">성장일지</div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">아직 성장일지가 없어요!<br/>성장일지를 만들러 가볼까요?</div>
       */}

        <Routes>
          <Route path="folder/:folderId" element={<GrowthDiaryList/>} />
          <Route path="diary/:recordId" element={<GrowthDiaryDetail/>} />
          <Route path="update/:recordId" element={<GrowthDiaryUpdate/>} />
          <Route path="write/:folderId" element={<GrowthDiaryCreate/>} />
        </Routes>
    </div>
    
  );
}

export default GrowthDiary;
