import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import api from '@/util/api.ts';

interface ModalProps {
  content: string;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  deleteElement: () => void;
}

export const Modal = ({
  content,
  modalState,
  setModalState,
  deleteElement,
}: ModalProps) => {
  const navigate = useNavigate();
  // const modalRef = useRef<HTMLDivElement>(null);
  const { token } = useAuthStore();

  const [password, setPassword] = useState<string>();

  const onClickCloseButton = () => {
    setModalState(!modalState);
  };

  // const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //     if(modalRef.current && !modalRef.current.contains(e.target as Node)){
  //         setModalState(false);
  //     }
  // }

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

    const checkPassword = async () => {
        const url = "/family/pwcheck";
        const config = {
            familyId : 11,
            password
        }

        const {data} = await api.post(url, config, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(data.result == "SUCCESS_PASSWORD_DISCORD"){
            alert('비밀번호가 일치하지 않습니다.');
        }
        else {
            if(confirm("삭제하시겠습니까?")){
                deleteElement();
                console.log(data);
            }
        }
    }

  return (
    <div className="modal-overlay">
      <div className="modal-top-container">
        <div className="modal-container">
          <div className="modal-header">
            <span>{content}</span>
            <span className="modal-close-button" onClick={onClickCloseButton}>
              X
            </span>
          </div>

          <div className="modal-content text-center">
            <p>가족방 비밀번호를 입력해주세요</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button onClick={checkPassword}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};
