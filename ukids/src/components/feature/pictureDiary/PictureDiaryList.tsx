import axios from 'axios';
import {useEffect,  useState} from 'react';

import { PictureDiaryItem } from './PictureDiaryItem';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

import { Navigate } from 'react-router-dom';

interface Diary{
  pictureDiaryId: number;
  familyId: number;
  pictureUrl: string;
  content: string;
  date: string;
}

const PictureDiaryList = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [totalPage, setTotalPage] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {token} = useAuthStore();

    const getDiaryList = async () =>{
        console.log(token);
        const url = `http://localhost:8080/api/picture-diary/all/11?page=${currentPage}&size=10`;
        const {data} = await axios.get(url, 
            {
                headers:{
                    Authorization: `${token}`
                }
            }
        );

        setDiaries(data.result.pictureDiaries);

    }


    useEffect(() => {
        getDiaryList();
    }, []);

    return(
        <div>
            <div>
                <Link to={`/paintdiary/write`}>만들기</Link>
            </div>
            <div>
                {diaries.map((item) => (
                    <Link to={`/paintdiary/${item.pictureDiaryId}`}>
                        <PictureDiaryItem key={item.pictureDiaryId} pictureUrl={item.pictureUrl} content={item.content} date={item.date}/>
                    </Link>
                ))}
            </div>
        </div>
    )

}



export default PictureDiaryList;