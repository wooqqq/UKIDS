import { useAuthStore } from '../../../stores/authStore';
import { useEffect, useState } from 'react';
import BlueButton from '../../common/BlueButton';

const UserUpdate = () => {
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

  const {
    userInfo,
    updateUser,
    getUserInfo,
    checkedEmail,
    checkedPhone,
    deleteUser,
  } = useAuthStore();

  const [pwError, setPwError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateError, setDateError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    // 컴포넌트가 마운트되면 사용자 정보를 가져와서 폼을 초기화
    const fetchUserInfo = async () => {
      await getUserInfo();
    };

    fetchUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    if (userInfo) {
      // 사용자 정보를 폼 상태에 설정
      setForm({
        id: userInfo.id,
        password: '',
        confirmPassword: '',
        name: userInfo.name,
        birthDate: userInfo.birthDate,
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        role: 'ROLE_USER',
      });
    }
  }, [userInfo]);
  const onClickDeleteUser = async () => {
    if (userInfo?.userId) {
      try {
        await deleteUser();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 되는 것을 방지
    setEmailError('');
    setPwError('');
    setPhoneError('');

    // 비밀번호와 확인 비밀번호가 일치하지 않을 때
    if (form.password && form.password !== form.confirmPassword) {
      setPwError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 빈 값 불가능
    if (!form.password || !form.confirmPassword) {
      setPwError('비밀번호를 입력하세요.');
      return;
    }

    // 생년월일 유효성 검사
    const today = new Date();
    const birthDate = new Date(form.birthDate);
    const isInvalidBirthDate = birthDate > today;

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

    // 업데이트할 사용자 데이터를 동적으로 생성
    const updateData: any = {
      id: form.id,
      name: form.name,
      birthDate: form.birthDate,
      email: form.email !== '' ? form.email : undefined,
      phone: form.phone !== '' ? form.phone : undefined,
      profileImage: '', // 프로필 이미지가 필요한 경우 추가 처리
    };

    // 사용자가 비밀번호를 입력한 경우에만 password 필드를 추가
    if (form.password) {
      updateData.password = form.password;
    }

    // 회원정보 수정 API 요청
    await updateUser(updateData);

    window.location.reload();
  };

  return (
    <>
      {/* 회원수정 박스 */}
      <div className="px-[100px]">
        <form onSubmit={handleUpdateUser} className="join-form w-[450px]">
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
                readOnly
                className="input-box px-5 w-80 font-semibold text-[#555555] bg-[#eee]"
              />
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-box px-5 w-80 font-semibold text-[#555555]"
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
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="input-box px-5 w-80 font-semibold text-[#555555]"
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
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-box px-5 w-80 font-semibold text-[#555555]"
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
                onChange={(e) =>
                  setForm({ ...form, birthDate: e.target.value })
                }
                className="input-box px-5 w-80 font-semibold text-[#555555]"
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
                className="input-box px-5 w-80 font-semibold text-[#555555]"
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
                className="input-box px-5 w-80 font-semibold text-[#555555]"
              />
            </div>
            <div className="pl-2 text-sm text-end">
              <p className="text-[#F03F2F]">{phoneError ? phoneError : ''}</p>
            </div>
          </section>
          <div className="flex justify-center">
            <BlueButton name="수정 완료" type="submit" path="" />
          </div>
        </form>
        <button className="common-btn red-btn" onClick={onClickDeleteUser}>
          회원 탈퇴
        </button>
      </div>
    </>
  );
};

export default UserUpdate;
