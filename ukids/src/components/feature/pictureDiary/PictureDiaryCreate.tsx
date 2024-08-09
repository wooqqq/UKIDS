import { useState } from "react";
import '@components/feature/pictureDiary/diaryItem.css'
import api from "@/util/api.ts"
import apiForm from "@/util/api.ts"

interface Diary{
    familyId: number;
    file: File | null,
    content: string;
    date: string;
}

export const PictureDiaryCreate = () => {

    const [diary, setDiary] = useState<Diary>({
        familyId: 11,
        file: null,         // File은 null로 초기화
        content: '',
        date: '',
    });


    const createDiary = async () => {
        const formData = new FormData();
        if(diary.file){
            formData.append('multipartFile', diary.file);

            formData.append('date', diary.date);
            formData.append('content', diary.content);
            formData.append(`familyId`, `${diary.familyId}`);

            const url = `/picture-diary`;
            const {data} = await api.post(url, formData, {
                headers: {
                    "Content-Type": undefined
                }
            });

            console.log(data);
        }
        else{
            alert('그림 또는 사진을 넣어주세요.');
        }
    }

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.item(0))
            setDiary({...diary, 'file' : e.target.files?.item(0)});
    }


    return (
        <div>
            <div>
                <input type="date" value={diary.date} onChange={(e) => setDiary({...diary, 'date' : e.target.value})}/>
            </div>
            <div className="image-box">
                <label className="input-file-box" htmlFor="fileUpload"><span>+</span></label>
                <input required className="hidden" id="fileUpload" type="file" accept="image/*" onChange={changeImage}/>
            </div>
            <div>
                <textarea className="input-content" value={diary?.content} onChange={(e) => setDiary({...diary, 'content' : e.target.value})}></textarea>
            </div>

            <button onClick={createDiary}>등록</button>
        </div>
    )
}