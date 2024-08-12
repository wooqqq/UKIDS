import { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import api from "@/util/api";
import BlueButton from "@components/common/BlueButton";

interface Letter{
    content: string;
    createDate: string;
    familyName: string;
    fromUsername: string;
    toUsername: string;
    toUserId: number;
    fromUserId: number;
    isRead: boolean;
}


export const LetterDetail = () => {
    const location = useLocation();
    const state = location.state?.state;
    const navigate = useNavigate();
    const {letterId} = useParams();

    const [letter, setLetter] = useState<Letter>();

    const getLetter = async () => {
        const url = `/letter/${letterId}`;

        const {data} = await api.get(url);

        setLetter(data.result);

    }

    useEffect(() => {
        console.log(state);
        getLetter();
    }, [])

    return(
        <div>
            <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
            </div>
            <div className="absolute left-[764px] top-[23px]">
                {!state ? 
                    <BlueButton name="답장하기" path={`/letters/write/${letter?.fromUserId}`} />
                    :
                    null
                }
            </div>
            <button onClick={() => {navigate('/letters')}} className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">목록</button>
            

            <div className="relative mt-40">
                <div>
                    <span>To. {letter?.toUsername}</span>
                    <span>{letter?.familyName}</span>
                    <span>{letter?.createDate}</span>
                </div>
                <div>{letter?.content}</div>
            </div>
        </div>
    )
}