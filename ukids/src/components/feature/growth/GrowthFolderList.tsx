import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '@/util/api.ts';
import { GrowthFolderItem } from '@/components/feature/growth/GrowthFolderItem';
import { GrowthFolderCreateModal } from '@components/feature/growth/GrowthFolderCreateModal';
import { Link } from 'react-router-dom';
import BlueButton from '@components/common/BlueButton';
import '@components/feature/growth/growthFolder.css';
import { useFamilyStore } from '@/stores/familyStore';

interface Folder {
  folderId: number;
  folderName: string;
}

export const GrowthFolderList = () => {
  const navigate = useNavigate();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const { selectedFamilyId } = useFamilyStore();

  const onModalOpen = () => {
    setModalState(!modalState);
  };

  const getFolderList = async () => {
    // 3번을 familyId로
    const url = `/growth-folder/all/${selectedFamilyId}?size=10`;

    const { data } = await api.get(url);

    console.log(data.result);
    
    setFolders(data.result.growthFolders);
  };

  useEffect(() => {
    if (selectedFamilyId) {
      getFolderList();
    } else {
      console.log('등록된 가족이 없어요! 가족을 등록해주세요');
      // 가족 ID가 설정되지 않았을 때
    }
  }, [selectedFamilyId]); // selectedFamilyId가 변경될 때마다 함수 호출

  const renewFolderList = () => {
    getFolderList();
  };

  const goToFolder = (folder: any) => {
    navigate(`/growthdiary/folder/${folder.folderId}`, {
      state: { folderName: folder.folderName },
    });
  };

  return (
    <div className="feature-box">

      {/* 메인 글자 */}
      <div className="main-label">
        성장일지 폴더 ({folders.length}개)
      </div>

      {/* 메인 오른쪽 : 만들기 버튼 */}
      <div style={{ marginLeft: '764px', marginTop: '33px' }}>
        <BlueButton name=" 만들기" path="/" onClick={onModalOpen} />
      </div>




      {/* 이하 내용물 영역 */}

      {/* 게시글이 없을 때  */}
      {folders.length === 0 ? (
        <div className="nothing-message">
          아직 성장일지 폴더가 없어요!
          <br />
          아이의 성장일지 폴더를 만들러 가볼까요?
        </div>
      ) : (
        <div className="folder-container">
          <div className="folder-scrollable">
            {folders.map((item) => (
              <Link
                to={{
                  pathname: `/growthdiary/folder/${item.folderId}`,
                }}
              >
                <GrowthFolderItem
                  key={item.folderId}
                  folderName={item.folderName}
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        {modalState && (
          <GrowthFolderCreateModal
            modalState={modalState}
            setModalState={setModalState}
            renewFolderList={renewFolderList}
          />
        )}
      </div>
    </div>
  );
};
