import { Route, Routes } from "react-router-dom";

import { LetterList } from "@components/feature/letters/LetterList";
import { LetterDetail } from "@components/feature/letters/LetterDetail";
import { LetterWrite } from "@components/feature/letters/LetterWrite";

const Letter = () => {
  return (
    <div  className="relative w-[911px] h-[576px]" >
      <Routes>
        <Route path="" element={<LetterList />} />
        <Route path="/:letterId" element={<LetterDetail/>} />
        <Route path="/write" element={<LetterWrite/>} />
        <Route path="/write/:fromUserId" element={<LetterWrite/>} />
      </Routes>
    </div>
  );
};

export default Letter;
