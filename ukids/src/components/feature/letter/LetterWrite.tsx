import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useFamilyStore } from "@/stores/familyStore";
import { useTreeStore } from "@/stores/treeStore";
import api from "@/util/api";
import BlueButton from "@components/common/BlueButton";
import axios from "axios";

interface Letter{
    content: string;
    createDate: string;
    familyName: string;
    fromUsername: string;
    toUsername: string;
    toUserId: number;
    isRead: boolean;
}

interface UserFamilyDto {
    userId: number;
    name: string;
    birthDate?: string;
    email?: string;
    phone?: string;
    profileImage?: string;
    role: string;
}

interface Member {
    familyMemberId: number;
    userFamilyDto: UserFamilyDto;
}


export const LetterWrite = () => {
    const navigate = useNavigate();

    const {fromUserId} = useParams();

    const { selectedFamilyId } = useFamilyStore();

    const { updateTreeExp } = useTreeStore();

    const [members, setMembers] = useState<Member[]>([]);

    const [toMember, setToMember] = useState<UserFamilyDto>();

    const [toUser, setToUser] = useState<UserFamilyDto>();

    const [dropCheck, setDropCheck] = useState<boolean>(false);

    const [content, setContent] = useState<string>();

    const getUserInfo = async () => {
        const url = `/user/${fromUserId}`;

        const {data} = await api.get(url);
        console.log(data);

        setToMember(data.result);

    }

    const getMembers = async () => {
        const url = `/member/${selectedFamilyId}`;
        
        const {data} = await api.get(url);
        console.log(data);
        setMembers(data.result);
    }

    const getToUser = async (userId: number) => {
        const url = `/user/${userId}`;
        const {data} = await api.get(url);

        setToUser(data.result);

        setDropCheck(false);
    }

    const sendLetter = async () => {
        const url = `/letter`;
        let inputData = null;
        if(toMember){
            console.log("답장");
            inputData = {
                // 가족 ID 전역에서 가져올 수 있도록 수정
                familyId: selectedFamilyId,
                content: content,
                toUserId: toMember.userId
            }
            
        }
        else{
            console.log("편지작성");
            if(!toUser){
                alert('편지 받을 사람을 선택해주세요.');
                return;
            }
            inputData = {
                // 가족 ID 전역에서 가져올 수 있도록 수정
                familyId: selectedFamilyId,
                content: content,
                toUserId: toUser.userId
            }
        }
        const {data} = await api.post(url, inputData);
        
        // 편지 작성 시 나무 경험치 증가
        updateTreeExp(selectedFamilyId, 75);

        navigate('/letters')

        console.log(data);
    }

    useEffect(() => {
        getMembers();
        if(fromUserId != undefined){
            getUserInfo();
        }
    }, [])



    return(
        <div>
            <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
            </div>
            <div className="absolute left-[764px] top-[23px]">
                <BlueButton name="보내기" path="/" onClick={sendLetter} />
            </div>
            <button onClick={() => {navigate('/letters')}} className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">목록</button>
            

            <div className="relative mt-40">
                    {fromUserId != undefined ? (
                        <div>{toMember?.name}</div>
                    ) :
                    (
                        <div>
                            <div onClick={() => setDropCheck(!dropCheck)}> {toUser != null ? toUser.name : "선택해주세요"}</div>
                            {dropCheck ? 
                                <ul>
                                    {members.map((item) =>
                                        <li key={item.userFamilyDto.userId} onClick={() => getToUser(item.userFamilyDto.userId)}>{item.userFamilyDto.name}</li> 
                                    )}
                                </ul>
                                : null
                            }
                        </div>
                    )
                }

                <textarea className="border-solid border-2" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
        </div>
    )
}