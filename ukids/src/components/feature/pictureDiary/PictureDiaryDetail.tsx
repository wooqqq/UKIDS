import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '@components/feature/modal/Modal.tsx';
import api from '@/util/api.ts';

import '@components/feature/modal/modal.css';


import BlueButton from '@components/common/BlueButton';
import WhiteButton from '@components/common/WhiteButton';

interface Diary {
  pictureDiaryId: number;
  familyId: number;
  pictureUrl: string;
  content: string;
  date: string;
}

export const PictureDiaryDetail = () => {
  let { pictureDiaryId } = useParams();

  const [diary, setDiary] = useState<Diary>();
  const [modalState, setModalState] = useState<boolean>(false);
  const content = '그림일기 삭제';

  const onModalOpen = () => {
    setModalState(!modalState);
  };

  const getDiary = async () => {
    const url = `/picture-diary/details/${pictureDiaryId}`;
    const { data } = await api.get(url);
    if (data.code === 201) {
      console.log(data.result);
    }

    setDiary(data.result);
  };

  const deleteDiary = async () => {
    const url = `/picture-diary/${pictureDiaryId}`;

    const { data } = await api.delete(url);

    console.log(data);
  };

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>



       {/* 날짜 */}
       <div
        style={{
          width: '200px', // 너비 조정
          height: '40px', // 높이 조정
          marginLeft: '350px',
          fontSize: '29px', // 글자 크기 조정
          padding: '5px 10px', // 내부 여백 추가
          borderRadius: '15px', // 모서리 둥글게 처리
          marginTop: '27px',
          fontFamily: 'UhBeejung' // 폰트 
        }}>

        {diary?.date} 

      </div>


      <div style={{ position: 'absolute', top: '27px', left: '30px' }}>
        <WhiteButton name="목록" path="/paintdiary"/>
      </div>
      

      <Link to={`/paintdiary/update/${pictureDiaryId}`}>
      <button className="common-btn gray-btn" style={{ position: 'absolute', top: '27px', right: '120px' }}>
        수정
      </button>
      </Link>
      

      <span className="home-modal-open-Button" onClick={onModalOpen}>
        <button className="common-btn red-font" style={{ position: 'absolute', top: '27px', right: '30px' }}>
          삭제
        </button>
      </span>





      

      {/* 그림 등록 네모 박스  */}
      <div className="image-box">
        
          <label className="input-file-box" htmlFor="fileUpload">
            
          {/* 이미지 미리보기 */}

          <div>
            <img src={diary?.pictureUrl} alt="" />
          </div>
         
          
          </label>

      </div>



      <div>
       


           {/* 글자 입력창  */}
          <div className="input-content">
            {diary?.content}

          </div>











        





















    
      {/* <div>{diary?.date}</div> */}


      {/* <div>
        <img src={diary?.pictureUrl} alt="" />
      </div> */}


      {/* <div>{diary?.content}</div> */}


      
      {/* <div>
        <button onClick={deleteDiary}>삭제</button>
      </div> */}



      {/* <Link to={`/paintdiary/update/${pictureDiaryId}`}>수정</Link> */}



      {/* <span className="home-modal-open-Button" onClick={onModalOpen}>
        modal 열기
      </span> */}

      <div>
        {modalState && (
          <Modal
            content={content}
            modalState={modalState}
            setModalState={setModalState}
            deleteElement={deleteDiary}
          />
        )}
      </div>
    </div>
    </div>
  );
};
