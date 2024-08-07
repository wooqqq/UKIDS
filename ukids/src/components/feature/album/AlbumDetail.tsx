import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AlbumDetail.css'; // CSS 파일을 임포트합니다.

interface Photo {
  imgSrc: string;
  text: string;
}

interface Post {
  date: string;
  photos: Photo[];
}

const AlbumDetail: React.FC = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
    const index = parseInt(photoId || '0', 10);
    if (!isNaN(index) && index >= 0 && index < storedPosts.length) {
      setPost(storedPosts[index]);
    }
  }, [photoId]);

  const handleDelete = () => {
    if (post) {
      const storedPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
      const index = parseInt(photoId || '0', 10);

      // Remove the post at the specified index
      const updatedPosts = storedPosts.filter((_, i) => i !== index);
      
      // Update localStorage
      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      // Navigate back to the albums page
      navigate('/albums');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feature-box">
      <div className="album-detail">
        <h1>{post.date}</h1>
        <button className="delete-btn" onClick={handleDelete}>삭제</button>
        <div className="photos-container">
          {post.photos.map((photo, index) => (
            <div key={index} className="photo-container">
              <img src={photo.imgSrc} alt={`Photo ${index + 1}`} className="photo-img" />
              <p>{photo.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
