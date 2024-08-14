import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFamilyStore } from '@/stores/familyStore';

import '@components/feature/pictureDiary/diaryItem.css';
import api from '@/util/api.ts';

import BlueButton from '@components/common/BlueButton';
import WhiteButton from '@components/common/WhiteButton';

<<<<<<< HEAD

=======
import { useFamilyStore } from '@/stores/familyStore';

import { useTreeStore } from '@/stores/treeStore';
>>>>>>> d7c2990a1394aee6152c6361e44389bc60338154

interface Diary {
  familyId: number;
  file: File | null;
  content: string;
  date: string;
}

export const PictureDiaryCreate = () => {
  // 추가
  const navigate = useNavigate();
  const {selectedFamilyId} = useFamilyStore();

  const {selectedFamilyId} = useFamilyStore();

  const {updateTreeExp} = useTreeStore();

  const [diary, setDiary] = useState<Diary>({

    // 가족아이디 수정!
    familyId: selectedFamilyId,
    file: null, // File은 null로 초기화
    content: '',
    date: '',
  });

  // 추가 : 이미지 미리보기 URL 상태
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const createDiary = async () => {
    const formData = new FormData();
    if (diary.file) {
      formData.append('multipartFile', diary.file);

      formData.append('date', diary.date);
      formData.append('content', diary.content);
      formData.append(`familyId`, `${diary.familyId}`);

      const url = `/picture-diary`;
      const { data } = await api.post(url, formData, {
        headers: {
          'Content-Type': undefined,
        },
      });

      console.log(data);

      // 추가 : 성공 후 페이지 이동
      updateTreeExp(selectedFamilyId, 25);
      navigate('/paintdiary');  
    } else {
      alert('그림 또는 사진을 넣어주세요.');
    }
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.item(0))
      setDiary({ ...diary, file: e.target.files?.item(0) });

    // 추가 : 이미지 미리보기
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      {/* 날짜 선택 */}
      <div className="picture-date">
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
            fontFamily: 'UhBeejung', // 폰트
          }}
        />
      </div>

      {/* 상단 목록, 등록 버튼 */}

      {/* <button onClick={createDiary}>등록</button> */}

      <div style={{ position: 'absolute', top: '27px', left: '30px' }}>
        <WhiteButton name="목록" path="/paintdiary" />
      </div>

      <div style={{ position: 'absolute', top: '27px', right: '30px' }}>
        <BlueButton name="등록" path="/paintdiary" onClick={createDiary} />
      </div>

      <div className="container">
        {/* 그림 등록 네모 박스  */}
        <div className="image-box">
          <label className="input-file-box" htmlFor="fileUpload">
            <span>+</span>
            {/* 이미지 미리보기 */}
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            <input
              required
              className="hidden"
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={changeImage}
            />
          </label>
        </div>

        <div>
          {/* 글자 입력창  */}
          <div>
            <textarea
              className="input-content"
              value={diary?.content}
              placeholder="내용을 입력하세요..."
              onChange={(e) => setDiary({ ...diary, content: e.target.value })}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
