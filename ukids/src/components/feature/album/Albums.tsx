import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../common/common.css';
import BlueButton from '../../common/BlueButton';

interface Photo {
  imgSrc: string;
  text: string;
}

interface Post {
  date: string;
  title: string;
  photos: Photo[];
}

const Albums: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  return (
    <div className="relative w-[911px] h-[576px]">
      {/* {posts.length} */}
      {posts.length === 24 ? (
        <div className="absolute left-0 top-0 w-[911px] h-[576px] shadow-[0_0_15px_rgba(153,153,153,0.25)] rounded-xl">

          <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#fff] rounded-[20px]"></div>
          <div className="absolute left-[764px] top-[23px]">
            <BlueButton name="만들기" path="/albums/upload" />
          </div>
          <div className="absolute left-[32px] top-[31px] text-[20px] font-['Pretendard'] font-semibold text-[#333]">앨범</div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[30px] font-['Pretendard'] font-light text-[#8e8e8e] text-center">
            아직 앨범이 없어요!<br/>앨범을 만들러 가볼까요?
          </div>
        </div>
      ) : (
        <div className="feature-box w-full h-full flex flex-col p-[10px] bg-[#fff] rounded-[20px] overflow-hidden">
          <div className="header flex items-center justify-between mb-10">
            <h1>사진 앨범</h1>
            <button className="common-btn" onClick={() => navigate('/albums/upload')}>
              등록
            </button>
          </div>
          <div className="feature-box-content w-full flex flex-col items-center justify-center gap-[31px] py-[21px] px-[19px]">
            <div className="albums-container">
              {posts.map((post, index) => (
                post.photos && post.photos.length > 0 && (
                  <Link key={index} to={`/albums/${index}`} className="album-item">
                    <img src={post.photos[0].imgSrc} alt={`Image ${index + 1}`} />
                    <div className="album-item-date">{post.date}</div>
                    <div className="album-item-title">{post.title}</div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
