import PictureDiaryList from "../components/feature/pictureDiary/PictureDiaryList";
import { Route, Routes, useLocation } from 'react-router-dom';
import { PictureDiaryDetail } from "../components/feature/pictureDiary/PictureDiaryDetail";
import { PictureDiaryCreate } from "../components/feature/pictureDiary/PictureDiaryCreate";
import { PictureDiaryUpdate } from "../components/feature/pictureDiary/PictureDiaryUpdate";
import useUserStore from "../stores/userStore";

const PaintingDiary = () => {
  const {loginToken} = useUserStore();

  return (
    <div className="feature-box">
      <h1>그림일기</h1>
      {/* <PictureDiaryList /> */}
      <Routes>
          <Route path="" element={<PictureDiaryList />} />
          <Route path=":pictureDiaryId" element={<PictureDiaryDetail />} />
          <Route path="write" element={<PictureDiaryCreate />} />
          <Route path="update/:pictureDiaryId" element={<PictureDiaryUpdate />} />
          
        </Routes>
    </div>
  );
};

export default PaintingDiary;
