import React from "react";
import { RecommendResponse } from "../../types/recommendation";

interface Props {
  data: RecommendResponse["data"];
  onBack: () => void;
}

const ResultView: React.FC<Props> = ({ data, onBack }) => {
  return (
    <div className="recommendation-container">
      <div className="recommendation-header">
        <button className="back-button" onClick={onBack}>←</button>
        <h2 className="recommendation-title">추천 결과</h2>
      </div>

      <section className="result-tags">
        <h3>Top Tags</h3>
        <div className="tag-row">
          {data.topTags.map((tag, idx) => (
            <div key={idx} className="detail-tag">
              #{tag.tagDescription} ({tag.score})
            </div>
          ))}
        </div>
      </section>

      <section className="result-exhibitions">
        <h3>추천 전시</h3>
        <div className="list">
          {data.exhibitions.map((ex) => (
            <div key={ex.id} className="card">
              <img
                className="thumb"
                src={ex.imagesUrls?.[0] || "https://via.placeholder.com/200"}
                alt={ex.title}
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/200"; }}
              />
              <div className="card-body">
                <h4>{ex.title}</h4>
                <p>{ex.author || "작가 미상"}</p>
                <p>{ex.address}</p>
                <p>{ex.startDate} ~ {ex.endDate}</p>
                <div className="card-tags">
                  {ex.tags?.map((t, i) => (
                    <span key={i} className="tag">#{t.tagDescription}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultView;
