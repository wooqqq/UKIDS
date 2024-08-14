import { useEffect } from 'react';
import { useFamilyStore } from '../../../stores/familyStore';
import RedButton from '../../common/RedButton';
import BlueButton from '../../common/BlueButton';
import CharacterTag from '../../common/CharaterTag';

const FamilyMemberUpdate = () => {
  const {
    selectedFamilyId,
    family,
    member,
    fetchMemberList,
    fetchFamilyInfo,
    deleteMember,
  } = useFamilyStore();

  // 가족 구성원, 가족 정보 저장
  useEffect(() => {
    if (selectedFamilyId) {
      fetchMemberList(selectedFamilyId);
      fetchFamilyInfo(selectedFamilyId);
    }
  }, [selectedFamilyId, fetchMemberList, fetchFamilyInfo]);

  const onClickDeleteMember = async (familyMemberId: number) => {
    try {
      await deleteMember(familyMemberId, true);
      alert('내보내기가 완료되었습니다.');
    } catch (error) {
      console.error('Error deleting family member', error);
    }
  };

  return (
    <>
      {/* 가족 구성원 수정 박스 */}
      <div className="px-[100px]">
        <form className="join-form w-[450px]">
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="text-end mr-2 w-28">
                <label htmlFor="id" className="text-[#555] font-bold">
                  가족방 이름
                </label>
              </div>
              <div className="px-5 w-80 font-semibold text-[#555555]">
                {family.name}
              </div>
            </div>
          </section>
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <div className="w-28 text-end mr-2">
                <label htmlFor="code" className="text-[#555] font-bold">
                  대표자
                </label>
              </div>
              <div className="px-5 w-80 font-semibold text-[#555555]">
                {member[0].userFamilyDto.name}
              </div>
            </div>
          </section>
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>역할</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {member.map((member) => (
                <tr>
                  <td>{member.userFamilyDto.name}</td>
                  <td>
                    <CharacterTag
                      character={(member.role === 'ROLE_NONE' && '없음') || ''}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => onClickDeleteMember(member.familyMemberId)}
                      className="common-btn gray-btn"
                    >
                      내보내기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-20">
            <div className="mr-6">
              <BlueButton name="수정 완료" type="submit" path="" />
            </div>
            <div>
              <RedButton name="가족 해체" path="" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FamilyMemberUpdate;
