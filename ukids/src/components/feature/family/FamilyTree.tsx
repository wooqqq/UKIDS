import { useEffect, useState } from 'react';
import { useTreeStore } from '@/stores/treeStore';
import treeLv1 from '@/assets/tree_lv1.png';
import treeLv2 from '@/assets/tree_lv2.png';
import treeLv3 from '@/assets/tree_lv3.png';
import treeLv4 from '@/assets/tree_lv4.png';
import treeLv5 from '@/assets/tree_lv5.png';
import '../../common/common.css';

const FamilyTree = () => {
  const { treeData, fetchTreeData, updateTreeExp, familyId } = useTreeStore(
    (state) => ({
      treeData: state.treeData,
      fetchTreeData: state.fetchTreeData,
      updateTreeExp: state.updateTreeExp,
      setFamilyId: state.setFamilyId,
      familyId: state.familyId,
    }),
  );

  const [level, setLevel] = useState(1);
  // 새로 추가
  const [canClick, setCanClick] = useState(true);

  useEffect(() => {
    console.log('familyID : ', familyId);
    if (familyId !== null) {
      fetchTreeData(familyId);
    }
  }, [fetchTreeData, familyId]);

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

  useEffect(() => {
    const lastClick = localStorage.getItem('lastClickTime');
    if (lastClick) {
      const lastClickTimestamp = parseInt(lastClick, 10);
      const lastClickDate = new Date(lastClickTimestamp);
      const now = new Date();
      const diffDays = Math.floor((now.getDate() - lastClickDate.getTime()) / (1000 * 60 * 60 * 24));
      setCanClick(diffDays >= 1);
    } else {
      setCanClick(true);
    }
  }, []);

  // 나무 클릭 시 출석 
  const handleAddExperience = async () => {
    if (treeData && treeData.result && canClick) {
      await updateTreeExp(familyId, 10);
      localStorage.setItem('lastClickTime', new Date().toString());
      setCanClick(false);
    }
  };

  if (!treeData) {
    return <div>Loading...</div>;
  }

  const treeImages: Record<number, string> = {
    1: treeLv1,
    2: treeLv2,
    3: treeLv3,
    4: treeLv4,
    5: treeLv5,
  };

  const treeImage = treeImages[level];

  return (
    <div className="h-[576px] ">
      <section>
        <div className="tree-info-box">
          <p>생성일: {treeData.result.createTime}</p>
          <p>담긴 편지 수 : {treeData.result.letterCount}통</p>
        </div>
        <img
          src={treeImage}
          alt="가족 유대감 나무"
          className="max-w-[400px] cursor-pointer"
          style={{
            margin: '50px auto 15px',
          }}
          onClick={handleAddExperience}
        />
      </section>
      <section>
        <div
          className="mb-1 font-bold px-[10px]"
          style={{ color: '#333', fontSize: '1.2rem' }}
        >
          Lv.{level} {treeData.result.familyName} 나무
        </div>
        <div className="w-full absolute text-center" style={{ color: '#fff' }}>
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
          ></div>
        </div>
        <div></div>
      </section>
      {/* 경험치 증가 테스트 버튼 */}
      <button
        onClick={handleAddExperience}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add 5 EXP
      </button>
    </div>
  );
};

export default FamilyTree;
