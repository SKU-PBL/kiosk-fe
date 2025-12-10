import React from "react";
import { Routes, Route } from "react-router-dom";
import ExhibitionPage from "../pages/ExhibitionPage";
import ExhibitionDetailPage from "../pages/ExhibitionDetailPage";
import RecommendationPage from "../pages/RecommendationPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ExhibitionPage />} />
      <Route path="/exhibition/:id" element={<ExhibitionDetailPage />} />
      <Route path="/recommendation" element={<RecommendationPage />} />
    </Routes>
  );
};

export default AppRouter;
