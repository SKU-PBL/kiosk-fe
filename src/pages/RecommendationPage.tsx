import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  category: string;
  content: string;
  leftTag: string;
  rightTag: string;
  leftImageUrl: string;
  rightImageUrl: string;
}

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: Question[];
}

const RecommendationPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => {
        if (!res.ok) throw new Error("API 요청 실패");
        return res.json();
      })
      .then((response: ApiResponse) => {
        if (response.success && response.data) {
          setQuestions(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const handleChoice = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return <div className="recommendation-container">로딩 중...</div>;
  }

  if (questions.length === 0) {
    return <div className="recommendation-container">데이터를 불러올 수 없습니다.</div>;
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="recommendation-container">
      <div className="recommendation-header">
        <button className="back-button" onClick={() => navigate("/")}>
          ←
        </button>
        <h2 className="recommendation-title">전시회 추천</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          {currentIndex + 1} / {questions.length}
        </p>
      </div>

      <div className="recommendation-content">
        <p className="question-text">{currentQuestion.content}</p>

        <div className="choices-grid">
          <div className="choice-card left" onClick={() => handleChoice()}>
            <img src={currentQuestion.leftImageUrl} alt={currentQuestion.leftTag} />
            <p className="choice-tag">{currentQuestion.leftTag}</p>
          </div>

          <div className="vs-divider">VS</div>

          <div className="choice-card right" onClick={() => handleChoice()}>
            <img src={currentQuestion.rightImageUrl} alt={currentQuestion.rightTag} />
            <p className="choice-tag">{currentQuestion.rightTag}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
