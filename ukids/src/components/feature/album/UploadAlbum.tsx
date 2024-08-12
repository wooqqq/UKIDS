import { useState, useRef } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../../stores/authStore';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import BlueButton from '../../common/BlueButton';
import WhiteButton from '../../common/WhiteButton';
import "../../feature/album/UploadAlbum.css"
import closeIcon from '../../../assets/close.png'; // 이미지 파일 import


// 인터페이스 수정
interface Photo {
  file: File;
  caption: string;
}




const UploadAlbum = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const token = useAuthStore((state) => state.token);
  



  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAddPhoto = () => {
    if (selectedFile && caption) {
      setPhotos(prevPhotos => [...prevPhotos, { file: selectedFile, caption }]);
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

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  const createAlbum = async () => {
    if (!date) {
      alert('날짜를 선택해주세요.');
      return null;  // 날짜가 선택되지 않았으면 null을 반환하고 함수 종료
    }
    try {
      const response = await axios.post('https://i11b306.p.ssafy.io/api/album', {
        title,
        date: date ? date.toISOString().slice(0, 10) : '',
        familyId: '6'
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        albumId: response.data.albumId,
        familyId: '6',
        date: date.toISOString().slice(0, 10)
      };
    } catch (error) {
      console.error('앨범 생성 실패:', error);
      alert('앨범 생성에 실패했습니다.');
      return null;
    }
  };
  
  console.log('앨범 만들어짐')


  const uploadPhotos = async (albumData: any) => {
    try {
      const responses = await Promise.all(photos.map(photo => {
        const formData = new FormData();
        formData.append('multipartFile', photo.file);
        formData.append('caption', photo.caption);
        formData.append('familyId', albumData.familyId);
        formData.append('date', albumData.date);
  
        return axios.post('https://i11b306.p.ssafy.io/api/photo', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }));
      console.log("Photo upload responses:", responses);
      // 응답에서 사진 ID 추출 (응답 형식에 따라 수정 필요)
      const photoIds = responses.map(res => res.data.photoId);
      console.log("Uploaded photo IDs:", photoIds);

      alert('모든 사진이 성공적으로 업로드되었습니다!');
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      alert('사진 업로드에 실패했습니다.');
    }
  };

  const uploadAlbum = async () => {
    if (photos.length === 0) {
      alert('사진을 등록해 주세요.');
      return;
    }
    if (!date) {
      alert('날짜를 선택해주세요.');
      return ;
    }


    const albumData = await createAlbum();
    if (albumData) {
      await uploadPhotos(albumData);
      setPhotos([]);
      setTitle('');
      setDate(new Date());
    }
  };

  return (
    <div className="feature-box relative w-[911px] h-[576px]" style={{ zIndex: 1000 }}>
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
          <WhiteButton name="목록" path="/albums" className="absolute left-0 top-0 w-[80px] h-[30px]" />
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2" style={{ zIndex: 9999 }}>
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
        <BlueButton name="등록" path="/albums" className="absolute" onClick={uploadAlbum} />
      </div>




      {/* <img className="absolute left-[347px] top-[60px] overflow-hidden" width="543" height="494" src="/src/assets/frame1.png" alt="frame1" /> */}
      <div className="absolute left-[78px] top-[154px] w-[302px] h-[358px]">
        <div className="absolute left-[35px] top-[12px] w-[99px] h-[29px]">
        <div
          className="absolute left-[2px] top-[3px] w-[94px] h-[23px] bg-[#fff] rounded-[39px]"
          style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
          onClick={handleFileClick}
          aria-label="파일 선택"
          title="파일 선택"
        >
            <input type="file" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
            <div className="absolute left-[23px] top-[3px] text-[12px] font-roboto text-custom-gray whitespace-nowrap cursor-pointer ">
              파일 찾기
            </div>
          </div>
        </div>
        <div className="absolute left-[21px] top-[41px] w-[256px] flex flex-col items-end justify-start gap-[8px] py-[15px] px-[21px] overflow-hidden">
          <div className="relative w-[214px] h-[204px] shrink-0 bg-[#fff] border-[1px] border-solid border-[#00000033] overflow-hidden">
            {selectedFile && (
              <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="absolute left-[6px] top-[9px] w-[208px] h-[184px] object-cover" />
            )}
          </div>
          <div className="w-[213px] h-[26px] shrink-0 flex flex-col items-start justify-start bg-[#fff] border-[1px] border-solid border-[#00000066] rounded-md">
            <div className="relative w-[190px] h-[24px] shrink-0">
              <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="↳ 사진 캡션을 작성하세요." className="absolute inset-0 w-full h-full px-2 text-[14px] font-['Inter'] text-[#868585] text-center outline-none rounded-md" maxLength={20} />
            </div>
          </div>



          <button className="mt-2 text-black rounded px-4 py-2" onClick={handleAddPhoto}>사진 등록</button>
        </div>
      </div>




      <div className="preview-box">
        {photos.map((photo, index) => (
          <div key={index} className="photo-containertwo relative">
            <img
              src={closeIcon}
              alt="Delete Icon"
              className="delete-icon"
              onClick={() => handleDeletePhoto(index)}
            />
        <img src={URL.createObjectURL(photo.file)} alt={`Preview ${index}`} className="w-full h-auto rounded" />
            <p>{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadAlbum;