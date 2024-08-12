import { useState } from "react";
import openLetterImg from "@/assets/openLetter.png"
import letterImg from "@/assets/letterImg.png"
interface Letter{
    letterId: number;
    content: string;
    createDate: string;
    familyName: string;
    fromUsername: string;
    toUsername: string;
    isRead: boolean;
}

interface LetterProps {
    letter: Letter;
    state: boolean;
}

export const LetterItem = ({letter, state} : LetterProps) => {

    const letterImgTag = () => {
        if(!state){
            if(letter.isRead){
                return <div><img className="w-85 h-122" src={letterImg} alt="" /></div>
            }
            else{
                return <div><img className="w-85 h-122" src={openLetterImg} alt="" /></div>
            }
        }
        else{
            return <img src={letterImg} alt="" />
        }
    }

    const letterState = () => {
        if(!state){
            return <div>From. {letter.fromUsername}</div>
        }
        else{
            return <div>To. {letter.toUsername}</div>
        }
    }

    return (
        <div>
            {letterImgTag()}
            <div>{letter.createDate}</div>
            {letterState()}
        </div>
    )
}