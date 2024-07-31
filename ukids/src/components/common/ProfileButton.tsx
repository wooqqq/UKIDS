const ProfileBtn: React.FC = () => {
  const user: { name: string; hasFamily: boolean } = {
    name: '김싸피',
    hasFamily: true,
  };

  let howTo: String = '가족방 생성하러 가기';

  if (user.hasFamily) {
    // 가족이 있으면 go home
    howTo = '집으로 돌아가기';
  }

  return (
    <div>
      <div>{user.name}</div>
      <div>{howTo}</div>
    </div>
  );
};

export default ProfileBtn;
