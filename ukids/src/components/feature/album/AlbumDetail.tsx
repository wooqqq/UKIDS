// 페이지 목표
// 앞선 페이지로부터 앨범 고유 id를 전달받아서, 해당 앨범의 전체 사진을 조회한다.
// api get /api/photo/all/{albumId}

// 절대 경로로 수정하기
import axios from 'axios';
import api from '@/util/api';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';

import './AlbumDetail.css';
import WhiteButton from '../../common/WhiteButton';
import BlueButton from '../../common/BlueButton';
import GrayButton from '../../common/GrayButton';
import { Modal } from '@components/feature/modal/Modal.tsx';

import '../../common/common.css';

// 타입스크립트 인터페이스 정의
// 1. 사진 한 장
interface Photo {
  photoId: number;
  fileName: string;
  imgUrl: string;
  caption: string;
}

// 2. 앨범 하나 (여러 사진으로 구성됨)
interface Album {
  albumId: number; // 앨범 구분 번호
  date: string; // 날짜
  title: string; // 제목
  photos: Photo[]; // 앨범 속 사진들 (배열)
}

const AlbumDetail: React.FC = () => {
  // 현재 URL에서 albumId 추출
  const { albumId } = useParams<{ albumId: string }>();
  const [modalState, setModalState] = useState<boolean>(false);
  const content = '앨범 삭제';
  const navigate = useNavigate();

  // 상태관리 : 앨범 하나
  const [album, setAlbum] = useState<Album | null>(null);

  const token = useAuthStore((state) => state.token);

  const onModalOpen = () => {
    setModalState(!modalState);
  };

  // 네비게이션 함수(수정, 삭제 할 때 사용)

  // 앨범안의 모든 사진 가져오기
  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await api.get(`/photo/all/${albumId}`);

        if (response.data.result) {
          setAlbum({
            albumId: response.data.result.album.albumId,
            date: response.data.result.album.date,
            title: response.data.result.album.title,
            photos: response.data.result.photoList,
          });
        }
      } catch (error) {
        console.error('앨범을 불러오는 데 실패했습니다', error);
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  // 앨범 정보가 아직 없을 경우 (주소 직접 입력했을시)
  if (!album) {
    return <div>로딩 중...</div>;
  }

  const deleteAlbum = async () => {
    const url = `/album/${albumId}`;

    const { data } = await api.delete(url);

    console.log(data);

    navigate('/albums');
  };

  return (
    <div className="feature-box relative w-[911px] h-[576px] overflow-x-hidden">
      {/* 상단 고정 영역 */}
      <div className=" left-88 top-37 w-[911px] h-[150px] bg-[#fff] z-50">
        <div className="absolute left-0 top-0 w-[911px] h-[150px] bg-[#fff] rounded-[20px] "></div>
        <div
          className="absolute left-[94px] top-[25px] w-[726px] h-[50px] border-[solid] border-#ddd border border-[0_0_2px] "
          style={{ textAlign: 'center' }}
        >
          {/* 제목 아래 실선*/}
          <div
            className="absolute -translate-y-1/2 left-[-1ㄴ0px] top-8 w-[750px]"
            style={{
              borderBottom: '2px solid #ddd', // 아래 테두리 추가
              paddingBottom: '20px', // 아래쪽 패딩 추가
            }}
          />
          {/* 제목 */}
          <span style={{ fontSize: '23px', color: '#333' }}>{album.title}</span>
        </div>

        {/* 목록, 날짜, 수정삭제 */}
        <div className="absolute -translate-x-1/2 left-1/2 top-[87px] w-[701px] h-[30px] z-50">
          {/* 목록 */}
          <WhiteButton
            name="목록"
            path="/albums"
            className="absolute left-0 top-0 w-[80px] h-[30px]"
          />

          {/* 날짜 */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 ">
            <span style={{ fontSize: '20px', color: '#333' }}>
              {album.date}
            </span>
          </div>
        </div>

        {/* 수정,삭제 */}
        {/* 기능 추가 필요함 */}
        <div className="absolute left-1/3 top-[87px] w-[701px] h-[30px] flex  items-center transform translate-x-1/2">
          <BlueButton
            name="수정"
            path={`/albums/update/${albumId}`}
            className="submit-btn mr-2"
          />
          <GrayButton
            name="삭제"
            path=""
            className="submit-btn"
            onClick={onModalOpen}
          />
        </div>
      </div>

      {/* 하단 내용 영역 */}

      <div className="photos-container">
        {album.photos.map((photo, index) => (
          <div key={index} className="photo-container">
            {/* 사진 + 캡션 */}
            <div className="photo-imgandcaption">
              <img
                src={photo.imgUrl}
                alt={`Photo ${index + 1}`}
                crossOrigin="anonymous"
              />
              <p dangerouslySetInnerHTML={{ __html: photo.caption }}></p>{' '}
              {/* Here HTML is rendered */}
            </div>
          </div>
        ))}
      </div>

      <div>
        {modalState && (
          <Modal
            content={content}
            modalState={modalState}
            setModalState={setModalState}
            deleteElement={deleteAlbum}
          />
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
