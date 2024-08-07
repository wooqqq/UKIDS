import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../common/common.css';

interface Photo {
  imgSrc: string;
  text: string;
}

interface Post {
  date: string;
  title: string; // 앨범 제목 추가
  photos: Photo[];
}

const Albums: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  const handleUploadClick = () => {
    navigate('/albums/upload');
  };

  return (
    <div className="feature-box w-[911px] flex flex-col p-[10px] bg-[#fff] rounded-[20px]">
      <div className="header flex items-center justify-between mb-10">
        <h1>사진 앨범</h1>
        <button
          className="common-btn"
          onClick={handleUploadClick}
        >
          등록
        </button>
      </div>
      <div className="feature-box-content w-full flex flex-col items-center justify-center gap-[31px] py-[21px] px-[19px]">
        {posts.length === 0 ? (
          <div>사진을 등록하세요</div>
        ) : (
          <div className="albums-container">
            {posts.map((post, index) => (
              post.photos && post.photos.length > 0 && (
                <div key={index} className="album-item">
                  <Link to={`/albums/${index}`}>
                    <div className="relative">
                      <img src={post.photos[0].imgSrc} alt={`Image ${index + 1}`} />
                    </div>
                    <div className="album-item-date">{post.date}</div>
                    <div className="album-item-title">{post.title}</div> {/* 앨범 제목 표시 */}
                    {/* <div className="album-item-text">{post.photos[0].text}</div> */}
                  </Link>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Albums;
