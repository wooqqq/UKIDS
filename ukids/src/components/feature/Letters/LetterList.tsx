import { useEffect, useState } from "react";
import api from "@/util/api.ts";
import { Link, useParams } from "react-router-dom";
import BlueButton from "@components/common/BlueButton";
import { LetterItem } from "@components/feature/letters/LetterItem";

interface Letter{
    letterId: number;
    content: string;
    createDate: string;
    familyName: string;
    fromUsername: string;
    toUsername: string;
}

export const LetterList = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [letters, setLetters] = useState<Letter[]>([]);

    // 받은 편지함(false)인지 보낸 편지함(true)인지
    const [state, setState] = useState<boolean>(false);

    const isExistLetterDiv = () => {
        // 받은 편지함
        if(!state){
            if(letters.length === 0){
                return <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">
                    아직 받은 편지가 없어요!<br/>면저 편지를 쓰러 가볼까요?
                </div>
            }
            
            else {
                return (<div>
                    {letters.map((item) => (
                        <LetterItem key={item.letterId} letter={item} state={state} />
                    ))}
                </div>)
            }

        }

        else {
            if(letters.length === 0){
                return <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">
                    아직 받은 편지가 없어요!<br/>면저 편지를 쓰러 가볼까요?
                </div>
            }

            else {

            }
        }
    }

    const getLetters = async () => {
        console.log(state);
        let url = '';
        // 받은 편지
        if(!state)
            url = '/letter/to';
        else
            url = 'letter/from';

        const {data} = await api.get(url);

        console.log(data);
        setLetters(data.result.letters);

    }
    
    const onModalOpen = () => {
        setModalState(!modalState);
    }

    useEffect(() => {
        getLetters();
    }, [])

    return (
        <div>
            <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
            </div>
            <div className="absolute left-[764px] top-[23px]">
                <BlueButton name="편지쓰기" path={`/letter/write`} />
            </div>
            <button onClick={() => setState(false)} className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">받은 편지함</button>
            <button onClick={() => setState(true)} className="absolute left-[128px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">보낸 편지함</button>
            

            <div className="relative mt-40">
                {isExistLetterDiv()}
            </div>



        </div>
    )
}