import React, { useState } from 'react';
// import axios from 'axios';
import api from '../../../util/api'; // 생성한 axios 인스턴스
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import './user.css';
import '../../common/common.css';
import BlueButton from '../../common/BlueButton';

const UserLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const nav = useNavigate();

  // const onClickInputButton = () => {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 되는 것을 방지

    try {
      // 로그인 API 요청
      const response = await api.post('/user/login', {
        id: id,
        password: password,
      });

      const { result } = response.data;
      const { userId } = result;
      console.log(userId);

      setToken(result); // 로그인 성공하여 토큰 저장
      api.defaults.headers.common['Authorization'] = `Bearer ${result}`; // 새로운 토큰 설정

      // const userResponse = await api.get(`/user/${userId}`);
      // const userData = userResponse.data.result;

      // localStorage.setItem('name', userData.name);

      nav('/main'); // 로그인 후 리디렉션할 페이지
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.' + error);
    }
  };

  const onClickJoinButton = () => {
    nav('/join');
  };

  return (
    <>
      {/* 로그인 박스 */}
      <div className="common-feature-box p-[50px]">
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="login-id-box px-5 font-semibold text-[#555555]"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-pw-box px-5 font-semibold text-[#555555]"
            />
          </div>
          {/* <button type="submit">로그인</button> */}
          <div className="mt-10">
            <BlueButton name="로그인" type="submit" path="" />
          </div>
        </form>
        <div className="flex items-center mt-4 justify-center">
          {/* <button className="join-find-btn">아이디 찾기</button>
          <div className="dash-box mx-2"></div>
          <button className="join-find-btn">비밀번호 찾기</button>
          <div className="dash-box mx-2"></div> */}
          <button className="join-find-btn" onClick={onClickJoinButton}>
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
