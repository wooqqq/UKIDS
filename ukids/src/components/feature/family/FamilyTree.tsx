// 메인화면에 뿌려질 나무 관련
import tree from '../../../assets/front-view-3d-tree-with-leaves-trunk.png';
import '../../common/common.css';

const FamilyTree = () => {
  return (
    <div className="h-[576px] ">
      <section>
        <div className="tree-info-box">
          {/* 나무 정보 (편지 개수, 생성일) */}
          <p>생성일: 2024년 8월 1일</p>
          <p>담긴 편지 수 : 5통</p>
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
        <div className="w-full h-7 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-7 bg-blue-600 rounded-full dark:bg-blue-500 text-center font-semibold content-center"
            style={{
              width: '82%',
              color: '#fff',
              background: '#FFBF33',
            }}
          >
            {/* 게이지바 */}
            820 EXP
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default FamilyTree;
