import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/util/api.ts"

interface ModalProps {
    modalState: boolean;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    renewFolderList: () => void
}

export const GrowthFolderCreateModal = ({modalState, setModalState, renewFolderList}: ModalProps) => {
    const navigate = useNavigate();
    
    const [folderName, setFolderName] = useState<string>();

    const onClickCloseButton = () => { 
        setModalState(!modalState);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setModalState(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [setModalState]);

    if (!modalState) return null;

    const createFolder = async () => {
        const url = `/growth-folder`;

        const inputData = {
            familyId: 6,
            folderName: folderName
        }

        const {data} = await api.post(url, inputData);

        console.log(data);

        renewFolderList();

        setModalState(!modalState);

    }

    return (
        <div className="modal-overlay">
            <div className="modal-top-container">
                <div className="modal-container">
                    <div className="modal-header">
                        <span>폴더 생성</span>
                        <span className="modal-close-button" onClick={onClickCloseButton}>X</span>
                    </div>

                    <div className="text-center mt-5">
                        생성할 폴더 이름을 입력해주세요 
                    </div>

                    <div className="modal-content text-center">
                        <label htmlFor="foldername"></label>
                        <input id="foldername" type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
                    </div>

                    <div className="text-center">
                        <button onClick={createFolder}>생성</button>
                    </div>

                </div>
            </div>
        </div>
    )
}