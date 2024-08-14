import { useEffect } from 'react';
import { useFamilyStore } from '../../../stores/familyStore';
import RedButton from '../../common/RedButton';

const FamilyMemberUpdate = () => {
  const { selectedFamilyId, family, member, fetchMemberList, fetchFamilyInfo } =
    useFamilyStore();

  // 가족 구성원, 가족 정보 저장
  useEffect(() => {
    if (selectedFamilyId) {
      fetchMemberList(selectedFamilyId);
      fetchFamilyInfo(selectedFamilyId);
    }
  }, [selectedFamilyId, fetchMemberList, fetchFamilyInfo]);

  useEffect(() => {
    if (family) {
    }
  }, [family]);

  useEffect(() => {
    if (member.length > 0) {
    }
  }, [member]);

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
                {family.userFamilyDto.name}
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
              <tr>
                <td>이삼성</td>
                <td>엄마</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <RedButton name="가족 해체" path="" />
        </form>
      </div>
    </>
  );
};

export default FamilyMemberUpdate;
