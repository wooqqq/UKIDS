
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BlueButton from '../../common/BlueButton';
import WhiteButton from '../../common/WhiteButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';


interface Photo {
  imgSrc: string;
  text: string;
}

const UploadPhoto = () => {
  const [title, setTitle] = useState(''); // 제목  
  const [albumDate, setAlbumDate] = useState(new Date()); // 날짜  
  
  const [photos, setPhotos] = useState<Photo[]>([]); // 사진  
  const [caption, setCaption] = useState(''); // 캡션  
  const [isEditingCaption, setIsEditingCaption] = useState(false); // 캡션 편집
  const [captionSaved, setCaptionSaved] = useState(false);  

  const [familyId, setFamilyId] = useState<string | null>(null); // 가족 ID  
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택된 파일  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  useEffect(() => {
    // 로그인 상태를 확인하고 사용자 정보를 가져오는 로직
    const fetchUserInfo = async () => {
      try {
        // 예시: 사용자 정보를 가져오는 API 호출
        const response = await axios.get('/api/user/info');
        setFamilyId(response.data.familyId);
      } catch (error) {
        console.error('Failed to fetch user info', error);
        // 로그인 페이지로 리디렉션 또는 오류 처리
      }
    };

    fetchUserInfo();
  }, []);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCaption = event.target.value;
    if (newCaption.length > 20) {
      alert('글자는 최대 20자까지 입니다');
    } else {
      setCaption(newCaption);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCaptionSave();
    }
  };


  const handleCaptionSave = () => {
    setIsEditingCaption(false);
  };

  const handleCaptionEditClick = () => {
    setIsEditingCaption(true);
  };


  // 최종 등록 (수정하기)
  const handleSubmit = async () => {
    if (!title) {
      alert('제목을 입력해주세요!');
      return;
    }

    try {
      // 앨범 생성 API 호출
      const albumResponse = await axios.post('https://i11b306.p.ssafy.io/api/album', {
        familyId: familyId as string,
        title: title,
        date: albumDate.toISOString().split('T')[0],
      });

      // navigate로 albums 페이지로 이동 시, photos 상태 전달
      navigate('/albums', {
        state: {
          albumId: albumResponse.data.albumId,
          title,
          date: albumDate.toISOString().split('T')[0],
          photos,
        },
      });
    } catch (error) {
      console.error('Failed to create album', error);
    }
  };

  return (
    <div className="feature-box relative w-[911px] h-[576px] overflow-x-hidden overflow-y-hidden">
      {/* 상단 고정 영역 */}
      <div className=" left-88 top-37 w-[911px] h-[150px] bg-[#fff] z-50">
        <div className="absolute left-0 top-0 w-[911px] h-[150px] bg-[#fff] rounded-[20px] "></div>
        <div className="absolute left-[94px] top-[20px] w-[726px] h-[50px] border-[solid] border-#ddd border border-[0_0_2px]">
          {/* 제목 입력  */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="absolute -translate-y-1/2 left-[-10px] top-1/2 w-[750px] form-control"
            style={{
              fontSize: '20px', // 폰트 크기
              fontWeight: '400', // 폰트 진하기
              color: 'black', // 텍스트 색상
              textAlign: 'center', // 텍스트 중앙 정렬
              borderRadius: '0', // 둥근 모서리 제거
              border: 'none', // 테두리 제거
              borderBottom: '2px solid #ddd', // 아래 테두리 추가
              paddingBottom: '10px', // 아래쪽 패딩 추가
              backgroundColor: 'transparent', // 배경색 투명
              outline: 'none' // 입력 상자 제거
            }}
          />
        </div>
        <div className="absolute -translate-x-1/2 left-1/2 top-[77px] w-[701px] h-[30px]">
          <WhiteButton name="목록" path="/albums" className="absolute left-0 top-0 w-[80px] h-[30px]" />
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
            <DatePicker
              selected={albumDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setAlbumDate(date);
                }
              }}
              dateFormat="yyyy/MM/dd"
              className="text-center w-full"
            />
          </div>
        </div>
        <div className="absolute translate-x-[45%] left-1/2 top-[77px] w-[701px] h-[30px]">
          <BlueButton name="등록" path="/albums" className="submit-btn" onClick={handleSubmit} />
        </div>
      </div>
      
      {/* 이하 여백 */}
      <img className="absolute left-[347px] top-[60px] overflow-hidden" width="543" height="494" src="/src/assets/frame1.png" alt="frame1" />
      <div className="absolute left-[78px] top-[154px] w-[302px] h-[358px]">
        <div className="absolute left-[35px] top-[12px] w-[99px] h-[29px]">
          <div
            className="absolute left-[2px] top-[3px] w-[94px] h-[23px] bg-[#fff] rounded-[39px]"
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
            onClick={handleFileClick}
          >
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="absolute left-[23px] top-[3px] text-[12px] font-['Adamina'] text-[#777] whitespace-nowrap cursor-pointer">
              파일 찾기
            </div>
          </div>
        </div>
        <div className="absolute left-[187px] top-[312px] w-[99px] h-[29px]">
          <div className="absolute left-[23px] top-[6px] w-[67px] h-[23px] bg-[#fff] rounded-[39px]" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div className="absolute left-[23px] top-[3px] text-[12px] font-['Adamina'] text-[#777]">캡션등록</div>
          </div>
        </div>
        <div className="absolute left-[21px] top-[41px] w-[256px] flex flex-col items-end justify-start gap-[8px] py-[15px] px-[21px] overflow-hidden">
          <div className="relative w-[214px] h-[204px] shrink-0 bg-[#fff] border-[1px] border-solid border-[#00000033] overflow-hidden">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="absolute left-[6px] top-[9px] w-[208px] h-[184px] object-cover"
              />
            ) : (
              <div className="absolute left-[6px] top-[9px] w-[208px] h-[184px] text-[15px] font-['Inter'] text-[#000] text-center flex flex-col justify-center">
                이미지를<br />업로드 업로드하세요.
              </div>
            )}
          </div>
          <div className="w-[213px] h-[26px] shrink-0 flex flex-col items-start justify-start bg-[#fff] border-[1px] border-solid border-[#00000066] rounded-md">
            <div className="relative w-[190px] h-[24px] shrink-0 ">
              
                <input
                  type="text"
                  value={caption}
                  onChange={handleCaptionChange}
                  onKeyDown={handleKeyDown}
                  placeholder="↳ 사진 캡션을 작성하세요."
                  onBlur={handleCaptionSave}
                  autoFocus
                  className="absolute inset-0 w-full h-full px-2 text-[14px] font-['Inter'] text-[#868585] text-center outline-none rounded-md"
                  maxLength={20}
                />
             
              <div className="absolute left-[180px] top-[-5px] w-[36px] h-[35px] flex flex-row items-center justify-start p-[0px]">
              <img width="14" height="14" src="/src/assets/write.png" alt="write" onClick={handleCaptionEditClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPhoto;
