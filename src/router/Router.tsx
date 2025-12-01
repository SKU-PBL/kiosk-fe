import React from "react";
import { Routes, Route } from "react-router-dom";
import ExhibitionPage from "../pages/ExhibitionPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* 기본 경로("/")로 접속하면 ExhibitionPage가 렌더링됩니다 */}
      <Route path="/" element={<ExhibitionPage />} />
      {/* 추가 페이지를 여기에 정의할 수 있습니다 */}
    </Routes>
  );
};

export default AppRouter;
