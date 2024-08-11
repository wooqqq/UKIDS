// 메인화면에 뿌려질 나무 관련
import { useEffect } from 'react';
import { useTreeStore } from '../../../stores/treeStore';
import tree from '../../../assets/front-view-3d-tree-with-leaves-trunk.png';
import '../../common/common.css';

const FamilyTree = () => {
  // 새로 추가된 부분
  const { treeData, fetchTreeData } = useTreeStore((state) => ({
    treeData: state.treeData,
    fetchTreeData: state.fetchTreeData,
  }));

  useEffect(() => {
    const familyId = 14;
    fetchTreeData(familyId);
  }, [fetchTreeData]);

  if (!treeData) {
    return <div>Loading...</div>;
  }

  console.log(treeData.result);
  

  return (
    <div className="h-[576px] ">
      <section>
        <div className="tree-info-box">
          {/* 나무 정보 (편지 개수, 생성일) */}
          <p>생성일: {treeData.result.createTime}</p>
          <p>담긴 편지 수 : {treeData.result.letterCount}통</p>
        </div>
        {/* 나무이미지 */}
        <img
          src={tree}
          alt="가족 유대감 나무"
          className="max-w-[400px]"
          style={{
            margin: '50px auto 15px',
          }}
        />
      </section>
      <section>
        {/* 레벨, 경험치 정보&게이지바 박스 */}
        <div
          className="mb-1 font-bold px-[10px]"
          style={{ color: '#333', fontSize: '1.2rem' }}
        >
          {/* 레벨, 경험치 정보 */}
          Lv.4 자라나무
        </div>
            <div className="w-full absolute text-center" style={{color: '#fff'}}>
              {/* 게이지바 */}
              {treeData.result.exp} EXP
            </div>
        <div className="w-full h-7 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-7 bg-blue-600 rounded-full dark:bg-blue-500 text-center font-semibold content-center"
            style={{
              width: `${treeData.result.exp / 10}%`,
              color: '#fff',
              background: '#FFBF33',
            }}
          >
            
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default FamilyTree;
