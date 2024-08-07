import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/common/common.css'; // CSS 파일을 임포트합니다.

const Albums = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const posts = Array(8).fill({
    date: "2024.08.06",
    imgSrc: "src/assets/testimage.jpg", // 동일한 이미지 사용
    text: "텍스트텍스트텍스트텍스트텍스트텍"
  });

  const handleUploadClick = () => {
    navigate('/upload'); // /upload 경로로 이동
  };

  return (
    <div className="feature-box w-[911px] h-[576px] flex flex-col items-center justify-center p-[10px] bg-[#fff] rounded-[20px]">
      <div className="self-stretch flex justify-between items-center">
        <h1> </h1>
        <button className="common-btn mt-10 mr-10" onClick={handleUploadClick}>등록</button>
      </div>
      <div className="w-[826px] flex flex-col items-center justify-center gap-[31px] py-[21px] px-[19px]">
        <div className="self-stretch flex flex-row items-center justify-center gap-[40px] py-[17px] px-[22px] flex-wrap">
          {posts.map((post, index) => (
            <div key={index} className="w-[141px] shrink-0 flex flex-col items-center justify-start gap-[5px] py-[5px] px-0 bg-[#dedede4d] rounded-[5px]">
              <Link to={`/albums/${index + 1}`}>
                <div className="w-[133px] h-[20px] shrink-0 flex flex-row items-center justify-start py-0 px-[4px]">
                  <div className="w-[125px] shrink-0"></div>
                </div>
                <div className="relative w-[141px] h-[125px] shrink-0">
                  <img className="absolute left-0 top-0" width="140" height="125" src={post.imgSrc} alt={`Image ${index + 1}`}></img>
                </div>
                <div className="self-stretch flex flex-row items-center justify-center py-0 px-0">
                  <div className="w-[85px] h-[19px] shrink-0 flex flex-row items-center justify-center">
                    <div className="w-[89px] text-[11px] font-['IBM_Plex_Sans_KR'] font-semibold text-center flex flex-col justify-center" style={{ color: 'darkgray' }}>{post.date}</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start py-0 px-[6px]">
                  <div className="flex-1 text-[10px] font-['IBM_Plex_Sans_KR'] text-darkgray" style={{ wordBreak: 'break-word' }}>{post.text}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Albums;
