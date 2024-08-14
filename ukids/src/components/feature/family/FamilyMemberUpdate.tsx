import { useEffect } from 'react';
import { useFamilyStore } from '../../../stores/familyStore';
import RedButton from '../../common/RedButton';
import CharacterTag from '../../common/CharaterTag';
import { useAuthStore } from '../../../stores/authStore';

const FamilyMemberUpdate = () => {
  const {
    selectedFamilyId,
    family,
    member,
    pendingMember,
    fetchMemberList,
    fetchFamilyInfo,
    deleteMember,
    pendingMemberList,
    approvedMember,
  } = useFamilyStore();

  const { getRepUserInfo, repUserInfo } = useAuthStore();

  // 가족 구성원, 가족 정보 저장
  useEffect(() => {
    if (selectedFamilyId) {
      fetchMemberList(selectedFamilyId);
      fetchFamilyInfo(selectedFamilyId);
      pendingMemberList(selectedFamilyId);
    }
  }, [selectedFamilyId, fetchMemberList, fetchFamilyInfo, pendingMemberList]);

  useEffect(() => {
    if (family.userFamilyDto) {
      getRepUserInfo(family.userFamilyDto.userId);
    }
  }, [getRepUserInfo]);

  const onClickDeleteMember = async (familyMemberId: number) => {
    try {
      await deleteMember(familyMemberId, true);
      alert('내보내기가 완료되었습니다.');
    } catch (error) {
      console.error('Error deleting family member', error);
    }
  };

  const onClickapprovedMember = async (familyMemberId: number) => {
    try {
      await approvedMember(familyMemberId);
      alert('가족 승인 완료되었습니다.');
    } catch (error) {
      console.error('Error deleting family member', error);
    }
  };

  return (
    <>
      {/* 가족 구성원 수정 박스 */}
      <div className="px-[10px]">
        <form className="join-form w-[670px]">
          <div className="h-[469px]">
            <section className="mb-6">
              <div className="flex justify-between items-center">
                <div className="text-end mr-2 w-80">
                  <label htmlFor="id" className="text-[#555] font-bold">
                    가족방 이름
                  </label>
                </div>
                <div className="px-5 w-96 font-semibold text-[#555555]">
                  {family.name}
                </div>
              </div>
            </section>
            <section className="mb-6">
              <div className="flex justify-between items-center">
                <div className="w-80 text-end mr-2">
                  <label htmlFor="code" className="text-[#555] font-bold">
                    대표자
                  </label>
                </div>
                <div className="px-5 w-96 font-semibold text-[#555555]">
                  {repUserInfo?.name}
                </div>
              </div>
            </section>
            <section className="flex justify-evenly">
              <div className="w-1/2 mr-10">
                <table>
                  <thead>
                    <tr>
                      <th colSpan={3}>가족 구성원 리스트</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.map((member) => (
                      <tr>
                        <td className="font-semibold px-6">
                          {member.userFamilyDto.name}
                        </td>
                        <td>
                          <CharacterTag
                            character={
                              (member.role === 'ROLE_NONE' && '없음') || ''
                            }
                          />
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              onClickDeleteMember(member.familyMemberId)
                            }
                            className="common-btn gray-btn w-20 text-sm p-0 mx-6"
                          >
                            내보내기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2}>가족 신청 리스트</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingMember.map((pendingMember) => (
                      <tr>
                        <td className="font-semibold px-6">
                          {pendingMember.userFamilyDto.name}
                        </td>

                        <td>
                          <button
                            onClick={() =>
                              onClickapprovedMember(
                                pendingMember.familyMemberId,
                              )
                            }
                            className="common-btn blue-btn w-20 text-sm p-0 mx-6"
                          >
                            수락하기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <div className="flex justify-center mr-10">
            <RedButton name="가족 해체" path="" />
          </div>
        </form>
      </div>
    </>
  );
};

export default FamilyMemberUpdate;
