import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import api from "@/util/api";
import { Modal } from "@components/feature/modal/Modal.tsx";
import { useNavigate, Link } from "react-router-dom";
import BlueButton from "@components/common/BlueButton";
interface Diary {
    folderId: number;
    recordId: number;
    writerId: number;
    title: number;
    content: number;
    date: string;
    imageName: string;
    imageUrl: string;
}

export const GrowthDiaryDetail = () => {
    const {recordId} = useParams();

    const [diary, setDiary] = useState<Diary>();
    const [modalState, setModalState] = useState<boolean>(false);
    const content = "자녀성장일지 삭제";

    const navigate = useNavigate();

    const onModalOpen = () => {
        setModalState(!modalState);
    }

    const getGrowthDiary = async () => {
        const url = `/growth-record/${[recordId]}`;

        // const inputData = {
        //     recordId: recordId,
        //     familyId: 11
        // }

        const {data} = await api.get(url);

        console.log(data);
        setDiary(data.result);
    }

    const deleteDiary = async () => {
        const url = `/growth-record/${recordId}`;

        const {data} = await api.delete(url)

        console.log(data);
        navigate(`/growthdiary/folder/${diary?.folderId}`);

    }

    useEffect(() => {
        getGrowthDiary();
    }, [])

    return (
        <div>
            <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
            </div>
            <div className="absolute left-[764px] top-[23px]">
                <BlueButton name="수정" path={`/growthdiary/update/${recordId}`} />
                <BlueButton name="삭제" path="/" onClick={onModalOpen} />
            </div>
            <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">성장일지</div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">아직 성장일지가 없어요!<br/>성장일지를 만들러 가볼까요?</div>

            <div className="relative mt-20">
                <div>{diary?.date}</div>
                <div><img src={diary?.imageUrl} alt="" /></div>
                <div>{diary?.content}</div>

                <div>
                    {modalState && (
                        <Modal content={content} modalState={modalState} setModalState={setModalState} deleteElement={deleteDiary}/>
                    )}
                </div>
            </div>
        </div>

    )

}