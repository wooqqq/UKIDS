import { useEffect, useState } from 'react';
import '@components/feature/pictureDiary/diaryItem.css';
import { useAuthStore } from '@/stores/authStore';
import { useParams } from 'react-router-dom';
import api from '@/util/api.ts';

interface Diary {
  pictureDiaryId: number;
  familyId: number;
  file: File | null;
  content: string;
  date: string;
}

export const PictureDiaryUpdate = () => {
  let { pictureDiaryId } = useParams() as { pictureDiaryId: string };
  const [diary, setDiary] = useState<Diary>({
    pictureDiaryId: parseInt(pictureDiaryId),
    familyId: 11,
    file: null, // File은 null로 초기화
    content: '',
    date: '',
  });

  const { token } = useAuthStore();

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
  };

  const updateDiary = async () => {
    const formData = new FormData();
    if (diary.file) {
      formData.append('multipartFile', diary.file);
      formData.append('pictureDiaryId', diary.pictureDiaryId.toString());
      formData.append('familyId', diary.familyId.toString());
      formData.append('date', diary.date);
      formData.append('content', diary.content);
      const url = `/picture-diary`;

      const { data } = await api.put(url, formData, {
        headers: {
          'Content-Type': undefined,
        },
      });

      console.log(data);
    } else {
      alert('그림 또는 사진을 넣어주세요.');
    }
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.item(0))
      setDiary({ ...diary, file: e.target.files?.item(0) });
  };

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>
      <div>
        <input
          type="date"
          value={diary.date}
          onChange={(e) => setDiary({ ...diary, date: e.target.value })}
        />
      </div>
      <div className="image-box">
        <label className="input-file-box" htmlFor="fileUpload">
          <span>+</span>
        </label>
        <input
          className="hidden"
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={changeImage}
        />
      </div>
      <div>
        <textarea
          className="input-content"
          value={diary?.content}
          onChange={(e) => setDiary({ ...diary, content: e.target.value })}
        ></textarea>
      </div>

      <button onClick={updateDiary}>등록</button>
    </div>
  );
};
