import { useEffect, useState } from "react";
import api from "@/util/api.ts";
import { GrowthFolderItem } from "@/components/feature/growth/GrowthFolderItem";
import { GrowthFolderCreateModal } from "@components/feature/growth/GrowthFolderCreateModal";
import { Link } from "react-router-dom";
import BlueButton from "@components/common/BlueButton";
import '@components/feature/growth/growthFolder.css'
interface Folder{
    folderId: number;
    folderName: string;
}

export const GrowthFolderList = () => {
    
    const [folders, setFolders] = useState<Folder[]>([]);
    const [modalState, setModalState] = useState<boolean>(false);


    const onModalOpen = () => {
      setModalState(!modalState);
    }


    const getFolderList = async () => {
        const url = `/growth-folder/all/11?size=10`;

        const {data} = await api.get(url);

        console.log(data.result);
        setFolders(data.result.growthFolders);

    }

    useEffect(() => {
        getFolderList();
    }, [])

    {/* <div className="relative mt-10"> */}
    return (
          <div>
                
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">아직 성장일지가 없어요!<br/>성장일지를 만들러 가볼까요?</div>

            
            <div>
                <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">


                    <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
                </div>
                <div className="absolute left-[764px] top-[23px]">
                    <BlueButton name="만들기" path="/" onClick={onModalOpen} />
                </div>
                <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333] whitespace-nowrap">성장일지</div>
                
                {folders.length === 0 ? (
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center whitespace-nowrap">아직 성장일지가 없어요!<br/>성장일지를 만들러 가볼까요?</div>
                )
                    :
                    (
                    <div className="album-container">
                        <div className="albums-scrollable">
                            {folders.map((item) => (
                                <Link to={`/growthdiary/folder/${item.folderId}`}>
                                    <GrowthFolderItem key={item.folderId} folderName={item.folderName} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    )
                }
                
                <div>
                    {modalState && (
                    <GrowthFolderCreateModal modalState={modalState} setModalState={setModalState}/>
                    )}
                </div>

                </div>

            </div>
    )
}