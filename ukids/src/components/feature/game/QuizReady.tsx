import FamilyMemberList from '../family/FamilyMemberList';

const QuizReady = () => {
  return (
    <>
      <div className="feature-box flex h-full">
        {/* 퀴즈영역 */}
        <div className="w-3/4">quiz</div>

        {/* 오른쪽 영역 */}
        <FamilyMemberList isChattingRoom={false} />
      </div>
    </>
  );
};

export default QuizReady;
