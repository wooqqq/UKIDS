// 메인화면에 뿌려질 나무 관련
import { useEffect, useState } from 'react';
import { useTreeStore } from '../../../stores/treeStore';
import treeLv1 from '../../../assets/tree_lv1.png';
import treeLv2 from '../../../assets/tree_lv2.png';
import treeLv3 from '../../../assets/tree_lv3.png';
import treeLv4 from '../../../assets/tree_lv4.png';
import treeLv5 from '../../../assets/tree_lv5.png';
import tree from '../../../assets/front-view-3d-tree-with-leaves-trunk.png';
import '../../common/common.css';

const FamilyTree = () => {
  // 새로 추가된 부분
  const { treeData, fetchTreeData } = useTreeStore((state) => ({
    treeData: state.treeData,
    fetchTreeData: state.fetchTreeData,
  }));

  const [level, setLevel] = useState(1);


  useEffect(() => {
    const familyId = 14;
    fetchTreeData(familyId);
  }, [fetchTreeData]);

  
  // 나무 레벨 설정
  useEffect(() => {
    if (treeData && treeData.result && treeData.result.exp != undefined) {
      const exp = treeData.result.exp;
      let calculatedLevel = 1;
      if (exp >= 800) {
        calculatedLevel = 5;
      } else if (exp >= 600) {
        calculatedLevel = 4;
      } else if (exp >= 400) {
        calculatedLevel = 3;
      } else if (exp >= 200) {
        calculatedLevel = 2;
      }
      setLevel(calculatedLevel);
    }
  }, [treeData]);


  if (!treeData) {
    return <div>Loading...</div>;
  }

  console.log(treeData.result);
  

  // 레벨에 따라 보여줄 이미지 매핑
  const treeImages: Record<number, string> = {
    1: treeLv1,
    2: treeLv2,
    3: treeLv3,
    4: treeLv4,
    5: treeLv5,
  }

  // 현재 레벨에 맞는 이미지 선택
  const treeImage = treeImages[level];
  

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
          src={treeImage}
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
          Lv.{level} 자라나무
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
