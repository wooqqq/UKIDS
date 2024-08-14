//페이지 목표
// 1. 로그인 사용자가 선택한 '가족'에 해당하는 전체 앨범들을 서버로부터 가져온다
// api get, /api/album/all/{familyId}
// 주의: 전체 앨범에는 페이지 정보(current page, total page)가 있음
// 한번에 최대 5개임

// 하나의 album은 여러개의 photo로 구성
// albumId를 통해 이 앨범의 사진들을 불러온다
// api get, /api/photo/all/{albumId}

// 여러개의 album들을 띄우는 페이지

// 2. 앨범 상세 페이지로 이동
// 각 앨범을 클릭하면 해당 앨범의 상세 페이지(/albums/{albumId})로 라우팅
// React Router의 Link 사용하기

// 절대경로로 수정하기

import axios from 'axios';
import api from '@/util/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../common/common.css';
import { useAuthStore } from '../../../stores/authStore';
// import { useAuthStore } from '@/stores/authStore';
import { useFamilyStore } from '@/stores/familyStore';
import BlueButton from '../../common/BlueButton';
// import BlueButton from '@/common/BlueButton';
import '../../feature/album/Albums.css';
// import '@/feature/album/Album.css'

import { Pagination } from '@components/feature/pagination/Pagination.tsx';

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

interface AlbumPhotosResponse {
  result: {
    size: number;
    currentPage: number;
    totalPage: number;
    album: Album; // 이 필드는 사용하지 않지만, 응답 구조를 반영하기 위해 포함할 수 있습니다.
    photoList: Photo[];
  };
}

const Albums: React.FC = () => {
  // const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const token = useAuthStore((state) => state.token);

  const { selectedFamilyId } = useFamilyStore();

  // 페이지네이션
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  // 페이지 당 게시글 개수
  const size: number = 3;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const fetchAlbums = async () => {
    try {
      // 불러온 전체 album에 페이지가 있음
      // 첫 페이지 데이터를 불러와서 전체 페이지 수 확인
      let response = await api.get(
        `/album/all/${selectedFamilyId}?page=${page}&size=${size}`,
      );

      // 전체 페이지 (예: 3)
      setTotalPage(response.data.result.totalPage);
      let allAlbums = response.data.result.albumResponseDtoList;
      console.log(response.data);

      // 2페이지 ~ total page 데이터 불러오기

      // for (let page = 2; page <= totalPages; page++) {
      //   response = await api.get(`/album/all/${selectedFamilyId}?page=${page}`);
      //   allAlbums = allAlbums.concat(response.data.result.albumResponseDtoList);
      // }

      // 전달받은 데이터를 albums에 저장
      // 이렇게 하면 albumId, title, date 세 정보만 저장됨
      // 사진은 albumId -> photo all 통해서 가져와야함
      // 이하 코드 참조

      // setAlbums(allAlbums);

      const albumsWithPhotos = await Promise.all(
        allAlbums.map(async (album: any): Promise<Album> => {
          const photosResponse = await api.get<AlbumPhotosResponse>(
            `/photo/all/${album.albumId}`,
          );
          return {
            ...album,
            photos: photosResponse.data.result.photoList, // 타입 에러가 해결되어야 합니다.
          };
        }),
      );
      // const albumsWithPhotos = await Promise.all(allAlbums.map(async (album: any): Promise<Album> => {
      //   const photosResponse = await axios.get<AlbumPhotosResponse>(`https://i11b306.p.ssafy.io/api/photo/all/${album.albumId}`, {
      //     headers: { 'Authorization': `Bearer ${token}` }
      //   });
      //   return {
      //     ...album,
      //     photos: photosResponse.data.result.photoList // 타입 에러가 해결되어야 합니다.
      //   };
      // }));

      setAlbums(albumsWithPhotos);
    } catch (error) {
      console.error('앨범 데이터를 불러오기 실패', error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);
  useEffect(() => {
    if (token && selectedFamilyId) {
      fetchAlbums();
    }
  }, [token, selectedFamilyId]);

  // 페이지가 변할 때
  useEffect(() => {
    fetchAlbums();
  }, [page]);

  return (
    <div className="feature-box">
      {/* 메인 오른쪽 만들기 버튼 */}
      <div style={{ marginLeft: '764px', marginTop: '33px' }}>
        <BlueButton name=" 만들기 " path="/albums/upload" />
      </div>

      {/* 메인 왼쪽 글자 */}
      <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333]">
        앨범
      </div>

      {/* 이하 내용물 영역 */}

      {/* 게시글이 없을 때  */}
      {albums.length === 0 ? (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">
          아직 앨범이 없어요!
          <br />
          앨범을 만들러 가볼까요?
        </div>
      ) : (
        <div>
          <div>
            {/* <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333]">앨범 ({albums.length}개) </div> */}

            <div style={{ marginTop: '30px' }}>
              <div
                className="albums-scrollable"
                style={{ marginRight: '10px' }}
              >
                {albums.map((album) => (
                  <Link
                    key={album.albumId}
                    to={`/albums/${album.albumId}`}
                    className="album-item"
                  >
                    {album.photos && album.photos.length > 0 ? (
                      <img
                        src={album.photos[0].imgUrl}
                        alt={`Image of ${album.title}`}
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="no-photo">사진 없음</div>
                    )}
                    <div className="album-item-date">{album.date}</div>
                    <div className="album-item-title">{album.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
