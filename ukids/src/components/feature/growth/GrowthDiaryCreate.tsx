import { useState } from "react";
import api from "@/util/api";
import { useNavigate, useParams } from "react-router-dom";
import BlueButton from "@components/common/BlueButton";

interface Diary {
    title: string;
    content: string;
    date: string;
    file: File | null;
}

export const GrowthDiaryCreate = () => {
    const { folderId } = useParams();
    const navigate = useNavigate();

    const [diary, setDiary] = useState<Diary>({
        file: null,         // File은 null로 초기화
        content: '',
        date: '',
        title: ''
    });

    const createDiary = async () => {
        if(diary.title == '') {
            alert('제목을 입력해주세요');
            return;
        }
        else if(diary.content == '') {
            alert('내용을 입력해주세요');
            return;
        }
        else if(diary.date == '') {
            alert('날짜를 선택해주세요');
            return;
        }

        const formData = new FormData();
        if(diary.file){
            formData.append('multipartFile', diary.file);

            formData.append('date', diary.date);
            formData.append('content', diary.content);
            formData.append(`folderId`, `${folderId}`);
            formData.append(`title`, diary.title);

            const url = `/growth-record`;
            const {data} = await api.post(url, formData, {
                headers: {
                    "Content-Type": undefined
                }
            });

            console.log(data);
            navigate(`/growthdiary/folder/${folderId}`)
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
            <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
            </div>
            <div className="absolute left-[764px] top-[23px]">
                <BlueButton name="등록" path="/" onClick={createDiary} />
            </div>
            <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">성장일지</div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">아직 성장일지가 없어요!<br/>성장일지를 만들러 가볼까요?</div>

            <div className="relative mt-40 ml-20">
                <div>
                    <input type="date" value={diary.date} onChange={(e) => setDiary({...diary, 'date' : e.target.value})} required />
                </div>
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" value={diary?.title} onChange={(e) => setDiary({...diary, 'title' : e.target.value})} required />
                </div>
                <div className="image-box">
                    <label className="input-file-box" htmlFor="fileUpload"><span>+</span></label>
                    <input className="hidden" id="fileUpload" type="file" accept="image/*" onChange={changeImage}/>
                </div>
                <div>
                    <textarea className="input-content" value={diary?.content} onChange={(e) => setDiary({...diary, 'content' : e.target.value})} required></textarea>
                </div>

                {/* <button onClick={createDiary}>등록</button> */}
            </div>

        </div>


    )
}