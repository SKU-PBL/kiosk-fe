import React from "react";
import { Question } from "../../types/recommendation";

interface Props {
  question: Question;
  submitting: boolean;
  onSelectWeight: (weight: number) => void;
  currentIndex: number;
  total: number;
}

const QuestionStep: React.FC<Props> = ({ question, submitting, onSelectWeight, currentIndex, total }) => {
  return (
    <div className="recommendation-content">
      <p className="question-text">
        {question.content}
        <span className="question-progress"> ({currentIndex + 1}/{total})</span>
      </p>
      <div className="choices-grid">
        <div className="choice-card left">
          <img
            src={question.leftImageUrl}
            alt={question.leftTag}
            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/200"; }}
          />
        </div>

        <div className="vs-divider">VS</div>

        <div className="choice-card right">
          <img
            src={question.rightImageUrl}
            alt={question.rightTag}
            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/200"; }}
          />
        </div>
      </div>

      <div
        className="weight-selector"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}
      >
        <div className="tag-label left" style={{ minWidth: "88px", textAlign: "right" }}>
          #{question.leftTag}
        </div>
        <div className="weight-buttons" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          {[1, 2, 3, 4, 5].map((weight) => {
            const size = weight <= 2 ? 48 + (2 - weight) * 12 : weight >= 4 ? 48 + (weight - 4) * 12 : 48;
            const isCenter = weight === 3;
            return (
              <button
                key={weight}
                className={`weight-button ${isCenter ? "center" : ""}`}
                onClick={() => onSelectWeight(weight)}
                disabled={submitting}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: isCenter ? "#e0e0e0" : "#6b4ce6",
                  border: isCenter ? "2px solid #999" : "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(107, 76, 230, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
                }}
              />
            );
          })}
        </div>
        <div className="tag-label right" style={{ minWidth: "88px", textAlign: "left" }}>
          #{question.rightTag}
        </div>
      </div>
    </div>
  );
};

export default QuestionStep;
