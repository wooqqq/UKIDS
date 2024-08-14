import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../../stores/authStore';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/util/api';

import { format } from 'date-fns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import BlueButton from '../../common/BlueButton';
import WhiteButton from '../../common/WhiteButton';
import '../../feature/album/UploadAlbum.css';
import closeIcon from '../../../assets/close.png'; // 이미지 파일 import
import { useFamilyStore } from '@/stores/familyStore';

// 인터페이스 수정
interface Album {
  date: string;
  title: string;
}

interface Photo {
  file: File;
  caption: string;
}

interface UploadedPhoto {
  photoId: number;
  fileName: string;
  imgUrl: string;
  s3Name: string;
  caption: string;
}

interface Caption {
  captionId: number;
  content: string;
  photoId: number;
}

export const UpdateAlbum = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [deletePhotos, setDeletePhotos] = useState<UploadedPhoto[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [uploadedCaption, setUploadedCaption] = useState<Caption[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { albumId } = useParams();

  const { selectedFamilyId } = useFamilyStore();

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAddPhoto = () => {
    if (selectedFile && caption) {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        { file: selectedFile, caption },
      ]);
      setSelectedFile(null);
      setCaption('');
    }
  };
  const handleDeletePhoto = (index: any) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // 클릭 이벤트 핸들러 내에서 안전하게 click 메소드 호출
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const uploadPhotos = async (albumData: any) => {
    // 삭제된 사진 없애기
    deletePhotos.map((photo) => {
      const s3Name = photo.s3Name.substring(6);
      const url = `/photo/uploaded/${s3Name}`;
      const { data } = api.delete(url);
    });

    // 삭제되지 않은 사진의 캡션 수정
    uploadedCaption.map((caption) => {
      const url = `/caption`;
      const inputData = {
        captionId: caption.captionId,
        photoId: caption.photoId,
        content: caption.content,
      };
      const { data } = api.put(url, inputData);
    });

    try {
      const responses = await Promise.all(
        photos.map((photo) => {
          const formData = new FormData();
          formData.append('multipartFile', photo.file);
          formData.append('caption', photo.caption);
          formData.append('familyId', selectedFamilyId);
          formData.append('date', albumData.date);

          return api.post('/photo', formData, {
            headers: {
              'Content-Type': undefined,
            },
          });
        }),
      );
      // 응답에서 사진 ID 추출 (응답 형식에 따라 수정 필요)
      const photoIds = responses.map((res) => res.data.photoId);

      // 앨범 정보 변경
      const inputData = {
        albumId: albumId,
        familyId: selectedFamilyId,
        title: title,
        date: format(date as Date, 'yyyy-MM-dd'),
      };
      api.put(`/album`, inputData);

      alert('모든 사진이 성공적으로 업로드되었습니다!');
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      alert('사진 업로드에 실패했습니다.');
    }

    navigate(`/albums/${albumId}`);
  };

  const updateAlbum = async () => {
    if (photos.length === 0 && uploadedPhotos.length === 0) {
      alert('사진을 등록해 주세요.');
      return;
    }
    if (!date) {
      alert('날짜를 선택해주세요.');
      return;
    }

    const url = `/album/${albumId}`;
    const { data } = await api.get(url);
    uploadPhotos(data.result);
  };

  const getUploadedPhotos = async () => {
    const url = `/photo/all/${albumId}`;

    const { data } = await api.get(url);

    setUploadedPhotos(data.result.photoList);
    setDate(data.result.album.date);
    setTitle(data.result.album.title);

    for (let i = 0; i < data.result.photoList.length; i++) {
      const urlCaption = `/caption/${data.result.photoList[i].photoId}`;
      const resp = await api.get(urlCaption);
      setUploadedCaption((prevCaption) => [...prevCaption, resp.data.result]);
    }
  };

  const deletePrevPhoto = (photo: UploadedPhoto, index: any) => {
    setUploadedPhotos((prevUploadedPhotos) =>
      prevUploadedPhotos.filter((_, i) => i !== index),
    );
    setDeletePhotos((prevDeletePhoto) => [...prevDeletePhoto, photo]);
    setUploadedCaption((prevUploadedCaptions) =>
      prevUploadedCaptions.filter((_, i) => i !== index),
    );
  };

  useEffect(() => {
    getUploadedPhotos();
  }, []);

  return (
    <div
      className="feature-box relative w-[911px] h-[576px]"
      style={{ zIndex: 1000 }}
    >
      <div className="left-88 top-37 w-[911px] h-[150px] bg-[#fff] z-50">
        <div className="absolute left-0 top-0 w-[911px] h-[150px] bg-[#fff] rounded-[20px]"></div>
        <div className="absolute left-[94px] top-[20px] w-[726px] h-[50px] border-[solid] border-#ddd border">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="absolute -translate-y-1/2 left-[-10px] top-1/2 w-[750px] form-control"
            style={{
              fontSize: '20px',
              fontWeight: '400',
              color: 'black',
              textAlign: 'center',
              borderRadius: '0',
              border: 'none',
              borderBottom: '2px solid #ddd',
              paddingBottom: '10px',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
          />
        </div>

        <div className="absolute -translate-x-1/2 left-1/2 top-[87px] w-[701px] h-[30px] style={{ zIndex: 9999 }}">
          <WhiteButton
            name="목록"
            path="/albums"
            className="absolute left-0 top-0 w-[80px] h-[30px]"
          />
          <div
            className="absolute left-1/2 top-0 transform -translate-x-1/2"
            style={{ zIndex: 9999 }}
          >
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              className="text-center w-full"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-[87px] right-[70px]">
        <BlueButton
          name="수정"
          path="/albums"
          className="absolute"
          onClick={updateAlbum}
        />
      </div>

      {/* <img className="absolute left-[347px] top-[60px] overflow-hidden" width="543" height="494" src="/src/assets/frame1.png" alt="frame1" /> */}
      <div className="absolute left-[78px] top-[154px] w-[302px] h-[358px]">
        <div className="absolute left-[35px] top-[12px] w-[99px] h-[29px]">
          <div
            className="absolute left-[2px] top-[3px] w-[94px] h-[23px] bg-[#fff] rounded-[39px]"
            style={{
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
            onClick={handleFileClick}
            aria-label="파일 선택"
            title="파일 선택"
          >
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="absolute left-[23px] top-[3px] text-[12px] font-roboto text-custom-gray whitespace-nowrap cursor-pointer ">
              파일 찾기
            </div>
          </div>
        </div>
        <div className="absolute left-[21px] top-[41px] w-[256px] flex flex-col items-end justify-start gap-[8px] py-[15px] px-[21px] overflow-hidden">
          <div className="relative w-[214px] h-[204px] shrink-0 bg-[#fff] border-[1px] border-solid border-[#00000033] overflow-hidden">
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                crossOrigin="anonymous"
                alt="Selected"
                className="absolute left-[6px] top-[9px] w-[208px] h-[184px] object-cover"
              />
            )}
          </div>
          <div className="w-[213px] h-[26px] shrink-0 flex flex-col items-start justify-start bg-[#fff] border-[1px] border-solid border-[#00000066] rounded-md">
            <div className="relative w-[190px] h-[24px] shrink-0">
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="↳ 사진 캡션을 작성하세요."
                className="absolute inset-0 w-full h-full px-2 text-[14px] font-['Inter'] text-[#868585] text-center outline-none rounded-md"
                maxLength={20}
              />
            </div>
          </div>

          <button
            className="mt-2 text-black rounded px-4 py-2"
            onClick={handleAddPhoto}
          >
            사진 등록
          </button>
        </div>
      </div>

      <div className="preview-box">
        {uploadedPhotos.map((photo, index) => (
          <div key={index} className="photo-containertwo relative">
            <img
              src={closeIcon}
              alt="Delete Icon"
              className="delete-icon"
              crossOrigin="anonymous"
              onClick={() => deletePrevPhoto(photo, index)}
            />
            <img
              src={photo.imgUrl}
              alt={`Preview ${index}`}
              crossOrigin="anonymous"
              className="w-full h-auto rounded"
            />
            <input
              className="text-center w-[100px]"
              type="text"
              value={uploadedCaption[index]?.content}
              onChange={(e) => {
                setUploadedCaption((prevCaptions) =>
                  prevCaptions.map((caption, i) =>
                    i === index
                      ? { ...caption, content: e.target.value }
                      : caption,
                  ),
                );
              }}
            />
          </div>
        ))}
        {photos.map((photo, index) => (
          <div key={index} className="photo-containertwo relative">
            <img
              src={closeIcon}
              alt="Delete Icon"
              className="delete-icon"
              crossOrigin="anonymous"
              onClick={() => handleDeletePhoto(index)}
            />
            <img
              src={URL.createObjectURL(photo.file)}
              alt={`Preview ${index}`}
              crossOrigin="anonymous"
              className="w-full h-auto rounded"
            />
            <input
              className="text-center w-[100px]"
              type="text"
              value={photo.caption}
              onChange={(e) =>
                setPhotos((prevPhotos) =>
                  prevPhotos.map((photo, i) =>
                    i === index ? { ...photo, caption: e.target.value } : photo,
                  ),
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
