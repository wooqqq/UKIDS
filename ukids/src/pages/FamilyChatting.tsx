import GrayButton from '../components/common/GrayButton';

const FamilyChatting = () => {
  return (
    <>
      <div id="본문 컨테이너 내부">
        <div id="채팅영역">
          <div id="대화영역"></div>
          <div id="하단 채팅입력 영역">
            <form>
              <input type="text" />
              <input type="button">보내기</input>
            </form>
          </div>
        </div>

        <div id="오른쪽 사이드 영역">
          <div id="상단 참여 가족 영역"></div>
          <div id="하단 버튼 영역"></div>
        </div>
      </div>

      <GrayButton name="통화하기" path="/video-call-room" />
    </>
  );
};

export default FamilyChatting;
