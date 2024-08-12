import { Route, Routes } from "react-router-dom";

import { LetterList } from "@components/feature/letters/LetterList";

const Letter = () => {
  return (
    <div  className="relative w-[911px] h-[576px]" >
      <Routes>
        <Route path="" element={<LetterList />} />
      </Routes>
    </div>
  );
};

export default Letter;
