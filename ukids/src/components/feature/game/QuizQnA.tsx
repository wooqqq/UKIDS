import { useEffect, useState } from 'react';
import axios from 'axios';

import GameButton from '../../common/GameButton';
import './games.css';
import useUserStore from '../../../stores/userStore';

const QuizQnA = () => {
  const { ukidsURL, chatRoomId } = useUserStore();
  const [num, setNum] = useState(0);
  const [questionList, setQuestionList] = useState([]);

  // 처음 접속 시 질문 목록 불러오기 - 가족방, 유저에 따라 다를 것
  useEffect(() => {
    axios
      .get(`${ukidsURL}/message/${chatRoomId}`)
      .then((response) => {
        const messageList = response.data;

        setQuestionList(
          messageList.filter((message: any) => {
            return !message.isDelete;
          }),
        );
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="feature-box">
        {/*상단 */}
        <div>
          <h1>질문목록</h1>
        </div>

        {/* 질문 목록 */}
        <div>
          <table>
            <tr>
              <th>번호</th>
              <th>질문</th>
              <th>답변</th>
            </tr>
            {questionList.map((value: { question: string; answer: string }) => {
              setNum((prev) => prev + 1);

              return (
                <tr>
                  <td>{num}</td>
                  <td>{value.question}</td>
                  <td>
                    {value.answer ? value.answer : '답변없음'}
                    {/* 수정버튼 */}
                    {/* 삭제버튼 */}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>

        {/* 버튼 */}
        <div>
          <GameButton name="퀴즈 더 내러가기" path="../question" />
        </div>
      </div>
    </>
  );
};

export default QuizQnA;
