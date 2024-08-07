import React, { useState } from 'react'; // useState 훅 : 함수형 컴포넌트의 상태 관리

import { useNavigate } from 'react-router-dom'; // useNavigate 훅 : 페이지를 이동

import QuillEditor from './QuillEditor';
// 로컬의 QuillEditor 컴포넌트를 가져옵니다.
// QuillEditor 텍스트 에디터. 사용자가 입력한 HTML 형식의 텍스트를 처리

import parse from 'html-react-parser';
// html-react-parser 라이브러리에서 parse 함수 가져오기
// parse 함수 : HTML 문자열 -> React 요소로 변환

import DatePicker from 'react-datepicker';
// react-datepicker 라이브러리에서 DatePicker 컴포넌트를 가져오기
// DatePicker : 날짜 선택 기능 제공

import 'react-datepicker/dist/react-datepicker.css';
// react-datepicker의 기본 CSS 파일을 가져와서 DatePicker 컴포넌트의 스타일을 적용합니다.

import './UploadPhoto.css'; 
// CSS 파일 임포트


// Photo 인터페이스 정의: imgSrc, text
interface Photo {
  imgSrc: string;
  text: string;
}

// UploadPhoto 컴포넌트 정의
// 사진, 현재 이미지, 설명, 앨범 제목, 날짜


const UploadPhoto: React.FC = () => {


  const [photos, setPhotos] = useState<Photo[]>([]);
    // 사용자가 추가한 모든 이미지와 설명을 저장.  (Photo 인터페이스대로)
    //  "사진 추가" 버튼을 클릭하면, currentImage와 currentDescription의 값으로 업데이트.
  
  
  const [currentImage, setCurrentImage] = useState<string | null>(null);
    // 사용자가 이미지 파일 선택기를 통해 선택한 이미지를 임시로 저장하고
    // 이 이미지를 photos 배열에 추가하고 null로 초기화
    // 새 이미지 선택 시 마다 업데이트


  const [currentDescription, setCurrentDescription] = useState<string>('');
    // 각 사진의 설명 (캡션)
  

  const [albumTitle, setAlbumTitle] = useState<string>('');
    // 각 사진의 제목

  const [albumDate, setAlbumDate] = useState<Date | null>(new Date());
    // 앨범 날짜 (초기값: 현재 날짜)

  const navigate = useNavigate();
    // 페이지 이동을 위한 useNavigate 훅 


  // 이미지 선택 시 호출되는 함수
   // 사용자가 이미지 파일을 선택할 때 호출, 선택한 이미지를 브라우저에서 미리볼 수 있도록 함
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]); // 임시 URL 생성
      setCurrentImage(newImage);
      // setCurrentImage 함수 :  currentImage 상태를 업데이트합니다.
      // newImage 변수에 저장된 파일의 URL -> currentImage 상태에 저장
    }
  };

  // "사진 추가" 버튼 클릭 시 호출되는 함수
  const handleAddPhoto = () => {
    if (currentImage && currentDescription) {
      setPhotos([...photos, { imgSrc: currentImage, text: currentDescription }]); // 선택 이미지, 설명 -> photos 배열에 추가
      setCurrentImage(null); // currentImage 상태 null 초기화
      setCurrentDescription(''); // currentDescription 상태 초기화
    }
  };

  // 폼 제출(업로드) 시 호출되는 함수
  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    // 제목이 없을 경우 경고 메시지 표시
    if (!albumTitle) {
      alert('제목을 입력해주세요!');
      return;
    }

    // 날짜가 없을 경우 경고 메시지 표시
    if (!albumDate) {
      alert('날짜를 선택해 주세요!');
      return;
    }

    // 사진이 없을 경우 경고 메시지 표시
    if (photos.length === 0) {
      alert('최소한 한 장의 사진을 업로드해주세요!');
      return;
    }
    

    // 새로운 게시물 객체 생성
    const newPost = {
      date: albumDate.toISOString().split('T')[0], // 날짜를 ISO 형식으로 변환하여 저장
      title: albumTitle,
      photos,
    };

    // 기존 게시물을 로컬 스토리지에서 가져와 업데이트한 후 다시 저장
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = [...storedPosts, newPost];
     // 기존 게시물 배열(storedPosts)에 새로운 게시물(newPost)을 추가합니다.
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    navigate('/albums'); // 업로드 후 앨범 페이지로 이동
  };

  return (
    <div className="feature-box">
  
      <form onSubmit={handleUpload} className="upload-form">
        {/* 앨범 제목 입력 필드 */}
        <input
          type="text"
          placeholder="앨범 제목을 입력하세요"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
        />
        {/* 앨범 날짜 선택 필드 */}
        <DatePicker
          selected={albumDate}
          onChange={(date: Date | null) => setAlbumDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="앨범 날짜를 선택하세요"
        />
        {/* 이미지 파일 선택 필드 */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {/* 설명 입력 필드 (QuillEditor 사용) */}
        <QuillEditor value={currentDescription} onChange={setCurrentDescription} />
        {/* 사진 추가 버튼 */}
        <button type="button" onClick={handleAddPhoto} className="common-btn mt-10">
          사진 추가
        </button>
        {/* 업로드 버튼 */}
        <button type="submit" className="common-btn mt-10">
          업로드
        </button>
      </form>
      <div className="uploaded-photos-container">
        {/* 업로드된 사진과 설명 목록 */}
        {photos.map((photo, index) => (
          <div key={index} className="uploaded-photo">
            <img src={photo.imgSrc} alt={`Upload ${index + 1}`} />
            <div>{parse(photo.text)}</div> {/* HTML로 파싱하여 렌더링 */}

          </div>
        ))}
      </div>
    </div>
  );
};
export default UploadPhoto;
