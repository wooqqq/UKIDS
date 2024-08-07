import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const newPost = {
      date: new Date().toISOString().split('T')[0],
      imgSrc: image,
      text: description
    };

    // Albums 컴포넌트의 setPosts 함수 호출
    if (location.state && location.state.setPosts) {
      location.state.setPosts((prevPosts) => [...prevPosts, newPost]);
    }
    navigate('/albums'); // 업로드 후 앨범 페이지로 이동
  };

  return (
    <div className="feature-box w-[911px] h-[576px] flex flex-col items-center justify-center p-[10px] bg-[#fff] rounded-[20px]">
      <h1>사진 업로드</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="사진 설명을 입력하세요" />
        <button type="submit" className="common-btn mt-10">업로드</button>
      </form>
    </div>
  );
};

export default UploadPhoto;
