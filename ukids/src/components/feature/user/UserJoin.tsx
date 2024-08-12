import { useState } from 'react';
import './user.css';
import '../../common/common.css';
import BlueButton from '../../common/BlueButton';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const UserJoin = () => {
  const [form, setForm] = useState({
    // 구조분해할당
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthDate: '',
    email: '',
    phone: '',
    role: 'ROLE_USER',
  });

  const nav = useNavigate();
  const joinUser = useAuthStore((state) => state.joinUser);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 되는 것을 방지

    if (form.password != form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      // 알림창 말고...
      // 입력창 빨갛게. 하단에 빨간 텍스트로 경고 문구
      // 가입 비활성화 => 는 그냥 return으로 막았으니 됐음.
      // 정규표현식 test사용
      //const haslatt = [/^0-9].test(password) -> true false
      //
      return;
    }

    // 회원가입 API 요청
    await joinUser({
      id: form.id,
      password: form.password,
      name: form.name,
      birthDate: form.birthDate,
      email: form.email,
      phone: form.phone,
    });
    nav('/login');
  };

  return (
    <>
      {/* 회원가입 박스 */}
      <div className="common-feature-box w-[1000px] h-[620px] p-[40px]">
        {/* <div className="title-style text-center text-[2rem] mb-3">회원가입</div> */}
        <form onSubmit={handleJoin} className="join-form">
          {/* <label htmlFor="id">아이디</label> */}
          <input
            type="text"
            id="id"
            placeholder="아이디"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            className="input-box px-5 font-semibold text-[#555555]"
          />
          {/* <label htmlFor="password">비밀번호</label> */}
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input-box px-5 font-semibold text-[#555555]"
          />
          {/* <label htmlFor="confirm-password">비밀번호 확인</label> */}
          <input
            type="password"
            id="confirm-password"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="input-box px-5 font-semibold text-[#555555]"
          />
          {/* <label htmlFor="name">이름</label> */}
          <input
            type="text"
            id="name"
            placeholder="이름"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-box px-5 font-semibold text-[#555555]"
          />
          {/* <label htmlFor="birth">생년월일</label> */}
          <input
            type="date"
            id="birthDate"
            placeholder="생년월일"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            className="input-box px-5 font-semibold text-[#555555]"
          />
          {/* <label htmlFor="email">이메일</label> */}
          <input
            type="email"
            id="email"
            placeholder="[선택] 이메일 주소 (비밀번호 찾기 등 본인 확인용)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-box px-5 font-semibold text-[#555555]"
          />
          {/* <label htmlFor="phone">휴대전화번호</label> */}
          <input
            type="number"
            id="phone"
            placeholder="[선택] 휴대전화번호"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-box px-5 font-semibold text-[#555555]"
          />
          <BlueButton name="회원가입" type="submit" path="" />
        </form>
      </div>
    </>
  );
};

export default UserJoin;
