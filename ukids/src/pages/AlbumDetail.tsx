import React from 'react';
import { useParams } from 'react-router-dom';

const AlbumDetail = () => {
  const { photoId } = useParams();

  // 이미지 데이터
  const images = [
    { id: 1, src: "/assets/testimage.jpg", description: "Description for Image 1" },
    { id: 2, src: "/assets/testimage.jpg", description: "Description for Image 2" },
    // 기타 등등
  ];

  // photoId에 해당하는 이미지 찾기
  const image = images.find(img => img.id === parseInt(photoId));

  return (
    <div className="feature-box">
      <h1>디테일페이지</h1>
      <h1>아이디: {photoId}</h1>
      {image ? (
        <>
          <img src={image.src} alt={`Description: ${image.description}`} />
          <p>{image.description}</p>
        </>
      ) : (
        <p>No image found for this ID.</p>
      )}
    </div>
  );
};

export default AlbumDetail;
