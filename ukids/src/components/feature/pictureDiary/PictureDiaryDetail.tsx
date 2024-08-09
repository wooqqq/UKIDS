import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from '../../../stores/authStore';
import { Link } from "react-router-dom";
import { Modal } from "@components/feature/modal/Modal.tsx";

import '@components/feature/modal/modal.css'

interface Diary{
    pictureDiaryId: number;
    familyId: number;
    pictureUrl: string;
    content: string;
    date: string;
  }
  

export const PictureDiaryDetail = () => {
    let {pictureDiaryId} = useParams();

    const [diary, setDiary] = useState<Diary>();
    const [modalState, setModalState] = useState<boolean>(false);
    const {token} = useAuthStore();
    const content = "그림일기 삭제";

    const onModalOpen = () => {
        setModalState(!modalState);
    }

    const getDiary = async () => {
        const url = `http://localhost:8080/api/picture-diary/details/${pictureDiaryId}`
        const {data} = await axios.get(url, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        if(data.code === 201){
            console.log(data.result);
        }

        setDiary(data.result);

    }

    const deleteDiary = async () => {
        const url = `http://localhost:8080/api/picture-diary/${useParams}`;

        const {data} = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(data);

    }


    useEffect(() => {
        getDiary();
    }, [])

    return(
        <div>
            <div>{diary?.date}</div>
            <div><img src={diary?.pictureUrl} alt="" /></div>
            <div>{diary?.content}</div>
            <div>
                <button onClick={deleteDiary}>삭제</button>
            </div>
            <Link to={`/paintdiary/update/${pictureDiaryId}`}>수정</Link>
            <span className="home-modal-open-Button" onClick={onModalOpen}>
                modal 열기
            </span>

            <div>
                {modalState && (
                    <Modal content={content} modalState={modalState} setModalState={setModalState} deleteElement={deleteDiary}/>
                )}
            </div>

        </div>
    )
}