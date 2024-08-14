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
  const today = new Date().toISOString().split('T')[0];
  const checkedId = useAuthStore((state) => state.checkedId);
  const checkedEmail = useAuthStore((state) => state.checkedEmail);
  const checkedPhone = useAuthStore((state) => state.checkedPhone);

  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 되는 것을 방지

    // 생년월일 유효성 검사
    const checkToday = new Date();
    const birthDate = new Date(form.birthDate);
    const isInvalidBirthDate = birthDate > checkToday;

    // 아이디 중복 확인
    if (form.id) {
      const isIdDuplicate = await checkedId(form.id);
      if (!isIdDuplicate) {
        setIdError('이미 사용 중인 아이디입니다.');
        return;
      }
    }

    if (form.password !== form.confirmPassword) {
      setPwError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 빈 값 불가능
    if (!form.password || !form.confirmPassword) {
      setPwError('비밀번호를 입력하세요.');
      return;
    }

    // 생년월일 유효성 검사
    if (isInvalidBirthDate) {
      setDateError('생년월일이 오늘 이후의 날짜입니다. 다시 입력해 주세요.');
      return;
    }
    // 이메일 중복 확인
    if (form.email) {
      const isEmailDuplicate = await checkedEmail(form.email);
      if (!isEmailDuplicate) {
        setEmailError('이미 사용 중인 이메일입니다.');
        return;
      }
    }

    // 전화번호 중복 확인
    if (form.phone) {
      const isPhoneDuplicate = await checkedPhone(form.phone);
      if (!isPhoneDuplicate) {
        setPhoneError('이미 사용 중인 전화번호입니다.');
        return;
      }
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
        <form onSubmit={handleJoin} className="join-form w-[520px]">
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label htmlFor="id" className="text-[#555] font-bold">
                  아이디
                </label>
              </div>
              <input
                type="text"
                id="id"
                placeholder="아이디"
                value={form.id}
                required
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                className="input-box px-5 w-96 font-semibold text-[#555555]"
              />
            </div>
            <div className="pl-2 text-sm text-end">
              <p className="text-[#F03F2F]">{idError ? idError : ''}</p>
            </div>
          </section>
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label htmlFor="password" className="text-[#555] font-bold">
                  비밀번호
                </label>
              </div>
              <input
                type="password"
                id="password"
                placeholder="비밀번호 입력"
                value={form.password}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-box px-5 w-96 font-semibold text-[#555555]"
              />
            </div>
          </section>
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label
                  htmlFor="confirm-password"
                  className="text-[#555] font-bold"
                >
                  비밀번호 확인
                </label>
              </div>
              <input
                type="password"
                id="confirm-password"
                placeholder="비밀번호 확인"
                value={form.confirmPassword}
                required
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="input-box px-5 w-96 font-semibold text-[#555555]"
              />
            </div>
            <div className="pl-2 text-sm text-end">
              <p className="text-[#F03F2F]">{pwError ? pwError : ''}</p>
            </div>
          </section>
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label htmlFor="name" className="text-[#555] font-bold">
                  이름
                </label>
              </div>
              <input
                type="text"
                id="name"
                placeholder="이름"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-box px-5 w-96 font-semibold text-[#555555]"
              />
            </div>
          </section>
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label htmlFor="birth" className="text-[#555] font-bold">
                  생년월일
                </label>
              </div>
              <input
                type="date"
                id="birthDate"
                placeholder="생년월일"
                value={form.birthDate}
                required
                max={today}
                onChange={(e) =>
                  setForm({ ...form, birthDate: e.target.value })
                }
                className="input-box px-5 w-96 font-semibold text-[#555555]"
              />
            </div>
            <div className="pl-2 text-sm text-end">
              <p className="text-[#F03F2F]">{dateError ? dateError : ''}</p>
            </div>
          </section>
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label className="text-[#555] font-bold">이메일</label>
              </div>
              <input
                type="email"
                id="email"
                placeholder="[선택] 이메일 주소 (비밀번호 찾기 등 본인 확인용)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-box px-5 w-96 font-semibold text-[#555555]"
              />
            </div>
            <div className="pl-2 text-sm text-end">
              <p className="text-[#F03F2F]">{emailError ? emailError : ''}</p>
            </div>
          </section>
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label htmlFor="phone" className="text-[#555] font-bold">
                  휴대전화번호
                </label>
              </div>
              <input
                type="text"
                id="phone"
                placeholder="[선택] 휴대전화번호"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-box px-5 w-96 font-semibold text-[#555555]"
              />
            </div>
            <div className="pl-2 text-sm text-end">
              <p className="text-[#F03F2F]">{phoneError ? phoneError : ''}</p>
            </div>
          </section>
          <div className="flex justify-center">
            <BlueButton name="회원가입" type="submit" path="" />
          </div>
        </form>
      </div>
    </>
  );
};

export default UserJoin;
