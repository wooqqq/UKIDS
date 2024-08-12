import { useEffect, useState } from "react";
import api from "@/util/api";
import { useNavigate, useParams } from "react-router-dom";
import BlueButton from "@components/common/BlueButton";

interface Diary {
    title: string;
    content: string;
    date: string;
    file: File | null;
    imageName: string;
    imageUrl: string;
}

export const GrowthDiaryUpdate = () => {
    const { recordId } = useParams();
    const [imageName, setImageName] = useState();
    const [imageCheck, setImageCheck] = useState<boolean>(false);
    const navigate = useNavigate();

    const [diary, setDiary] = useState<Diary>({
        file: null,         // File은 null로 초기화
        content: '',
        date: '',
        title: '',
        imageName: '',
        imageUrl: ''
    });

    const getDiary = async () => {
        const url = `/growth-record/${recordId}`;
        
        const {data} = await api.get(url);

        console.log(data);
        setDiary(data.result);
        setImageName(data.result.imageName);
    } 

    const updateDiary = async () => {
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
        if(!confirm('수정하시겠습니까?')) return;


        const formData = new FormData();
        formData.append('date', diary.date);
        formData.append('content', diary.content);
        formData.append(`title`, diary.title);
        // 이미지 수정
        if(diary.file){
            formData.append('multipartFile', diary.file);
        }

        const url = `/growth-record/${recordId}`;
        const {data} = await api.put(url, formData, {
            headers: {
                "Content-Type": undefined
            }
        });

        console.log(data);
        navigate(`/growthdiary/diary/${recordId}`)

    }

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.item(0))
            setDiary({...diary, 'file' : e.target.files?.item(0)});
    }

    useEffect(() => {
        getDiary();
    }, [])

    return (

        <div>
            <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
            </div>
            <div className="absolute left-[764px] top-[23px]">
                <BlueButton name="수정" path="/" onClick={updateDiary} />
            </div>
            <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">성장일지</div>

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

            </div>
        </div>

    )
}