import { useEffect, useState } from "react";
import api from "@/util/api.ts";
import { Link, useParams } from "react-router-dom";
import { GrowthDiaryItem } from "@/components/feature/growth/GrowthDiaryItem";
import BlueButton from "@components/common/BlueButton";

interface Diary{
    recordId: number;
    writerId: number;
    title: number;
    content: number;
    date: string;
    imageUrl: string;
}

export const GrowthDiaryList = () => {
    const {folderId} = useParams();

    const [diaries, setDiaries] = useState<Diary[]>([]);

    const getDiaryList = async () => {
        // console.log('folderId: ', folderId);
        const url = `/growth-record/all/${folderId}?size=10`;

        const {data} = await api.get(url);

        console.log(data.result);
        setDiaries(data.result.growthRecords);

    }

    useEffect(() => {
        getDiaryList();
    }, [])

    return (
        <div>
            <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
            </div>
            <div className="absolute left-[764px] top-[23px]">
                <BlueButton name="만들기" path={`/growthdiary/write/${folderId}`} />
            </div>
            <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">성장일지</div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">아직 성장일지가 없어요!<br/>성장일지를 만들러 가볼까요?</div>
        
            <div className="relative mt-10">
                {diaries.map((item) => (
                    <Link to={`/growthdiary/diary/${item.recordId}`}>
                        <GrowthDiaryItem key={item.recordId} title={item.title} date={item.date} imageUrl={item.imageUrl}/>
                    </Link>
                ))}
            </div>

        </div>
    )
}