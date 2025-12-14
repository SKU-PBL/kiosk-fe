import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionStep from "../components/recommendation/QuestionStep";
import ResultView from "../components/recommendation/ResultView";
import {
  Question,
  ApiResponse,
  UserChoice,
  RecommendResponse,
} from "../types/recommendation";

const RECOMMEND_URL_ABS = "https://api.insa-exhibition.shop/api/recommend";

const RecommendationPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
  const [resultData, setResultData] = useState<RecommendResponse["data"] | null>(null);
  const [submitting, setSubmitting] = useState(false);
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

  const weightToScore = (weight: number) => weight - 1;

  const handleWeightClick = (weight: number) => {
    const currentQuestion = questions[currentIndex];
    const selectedTag = weight <= 2 ? currentQuestion.leftTag : weight >= 4 ? currentQuestion.rightTag : currentQuestion.leftTag;
    const updatedChoices = [...userChoices, { questionId: currentQuestion.id, selectedTag, weight }];

    if (currentIndex < questions.length - 1) {
      setUserChoices(updatedChoices);
      setCurrentIndex(currentIndex + 1);
      return;
    }

    setSubmitting(true);
    const answers = updatedChoices.map((c) => ({ questionId: c.questionId, score: weightToScore(c.weight) }));
    const requestUrl = RECOMMEND_URL_ABS;
    const payload = { answers };
    const payloadJson = JSON.stringify(payload);

    console.log("[RECOMMEND] URL:", requestUrl);
    console.log("[RECOMMEND] Payload object:", payload);
    console.log("[RECOMMEND] Payload JSON:", payloadJson);

    fetch(requestUrl, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json", accept: "*/*" },
      body: payloadJson,
    })
      .then((res) => {
        console.log("[RECOMMEND] Response status:", res.status, res.statusText);
        if (!res.ok) throw new Error(`추천 API 요청 실패 (status ${res.status})`);
        return res.json();
      })
      .then((res: RecommendResponse) => {
        console.log("[RECOMMEND] Response body:", res);
        if (res.success && res.data) setResultData(res.data);
        else throw new Error(res.message || "추천 실패");
      })
      .catch((err) => {
        console.error("[RECOMMEND] Error name:", err?.name);
        console.error("[RECOMMEND] Error message:", err?.message);
        console.error("[RECOMMEND] Error stack:", err?.stack);
        console.error("[RECOMMEND] Failed URL:", requestUrl);
        console.error("[RECOMMEND] Failed Payload JSON:", payloadJson);
        alert(err.message || "추천 API 요청 실패");
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) return <div className="recommendation-container">로딩 중...</div>;
  if (questions.length === 0) return <div className="recommendation-container">데이터를 불러올 수 없습니다.</div>;
  if (resultData) return <ResultView data={resultData} onBack={() => navigate("/")} />;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="recommendation-container">
      <div className="recommendation-header">
        <button className="back-button" onClick={() => navigate("/")}>←</button>
      </div>

      <QuestionStep
        question={currentQuestion}
        submitting={submitting}
        onSelectWeight={handleWeightClick}
        currentIndex={currentIndex}
        total={questions.length}
      />
    </div>
  );
};

export default RecommendationPage;
