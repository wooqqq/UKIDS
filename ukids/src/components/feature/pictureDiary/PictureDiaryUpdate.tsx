import { useEffect, useState } from 'react';
import '@components/feature/pictureDiary/diaryItem.css';
import { useAuthStore } from '@/stores/authStore';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/util/api.ts';


import BlueButton from '@components/common/BlueButton';
import WhiteButton from '@components/common/WhiteButton';

import { useFamilyStore } from '@/stores/familyStore';

interface Diary {
  pictureDiaryId: number;
  familyId: number;
  file: File | null;
  content: string;
  date: string;
}

export const PictureDiaryUpdate = () => {

  // 추가
  const navigate = useNavigate();

  const {selectedFamilyId} = useFamilyStore();

  let { pictureDiaryId } = useParams() as { pictureDiaryId: string };
  const [diary, setDiary] = useState<Diary>({
    pictureDiaryId: parseInt(pictureDiaryId),
    familyId: selectedFamilyId,
    file: null, // File은 null로 초기화
    content: '',
    date: '',
  });

  const { token } = useAuthStore();

  // 추가 : 이미지 미리보기 URL 상태 
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); 

  const getDiary = async () => {
    const url = `/picture-diary/details/${pictureDiaryId}`;
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.code === 201) {
      console.log(data.result);
    }

    setDiary(data.result);
    // 추가 : 이미지 URL 설정
    setPreviewUrl(data.result.pictureUrl); 
  };

  const updateDiary = async () => {
    const formData = new FormData();
    if (diary.file) {
      formData.append('multipartFile', diary.file);
    }
      formData.append('pictureDiaryId', diary.pictureDiaryId.toString());
      formData.append('familyId', diary.familyId.toString());
      formData.append('date', diary.date);
      formData.append('content', diary.content);

      const url = `/picture-diary`;

      const { data } = await api.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data);

      // 추가 : 성공 후 페이지 이동
      navigate('/paintdiary');  
  
  };
  
  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result as string); // 미리보기 URL 업데이트
      };
      fileReader.readAsDataURL(e.target.files[0]);
      setDiary({ ...diary, file: e.target.files[0] });
    }
  };

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>


      
            {/* 날짜 선택 */}
            <div>
            <input
              type="date"
              value={diary.date}
              onChange={(e) => setDiary({ ...diary, date: e.target.value })}
              style={{
                width: '200px', // 너비 조정
                height: '40px', // 높이 조정
                marginLeft: '350px',
                fontSize: '29px', // 글자 크기 조정
                padding: '5px 10px', // 내부 여백 추가
                borderRadius: '15px', // 모서리 둥글게 처리
                marginTop: '27px',
                fontFamily: 'UhBeejung' // 폰트 
              }}
            />
            </div>


           {/* 상단 목록, 등록 버튼 */}

     
      
      
          {/* <button onClick={createDiary}>등록</button> */}


          <div style={{ position: 'absolute', top: '27px', left: '30px' }}>
            <WhiteButton name="목록" path="/paintdiary"/>
          </div>

          <div style={{ position: 'absolute', top: '27px', right: '30px' }}>
            <BlueButton name="등록" path="/paintdiary" onClick={updateDiary} />
          </div>






      <div className="container">      

          <div className="image-box">
            <label className="input-file-box" htmlFor="fileUpload">
              <span>+</span>
              {/* 이미지 미리보기 */}
              {previewUrl && <img src={previewUrl} alt="Preview"/>}
            <input
              className="hidden"
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={changeImage}
              />
              </label>
          </div>
          <div>
            <textarea
              className="input-content"
              value={diary?.content}
              onChange={(e) => setDiary({ ...diary, content: e.target.value })}
            ></textarea>
          </div>

          {/* <button onClick={updateDiary}>등록</button> */}


      </div>
    </div>
  );
};
