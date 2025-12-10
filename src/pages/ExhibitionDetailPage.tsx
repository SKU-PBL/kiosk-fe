import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Tag {
  tagName: string;
  tagDescription: string;
}

interface Exhibition {
  id: number;
  title: string;
  address: string;
  author: string;
  startDate: string;
  endDate: string;
  openTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  closeTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  tags: Tag[];
}

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: Exhibition;
}

const ExhibitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/exhibition/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("API 요청 실패");
        return res.json();
      })
      .then((response: ApiResponse) => {
        if (response.success && response.data) {
          setExhibition(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [id]);

  const formatTime = (time: { hour: number; minute: number } | null) => {
    if (!time) return "정보 없음";
    return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="detail-container">로딩 중...</div>;
  }

  if (!exhibition) {
    return <div className="detail-container">전시회 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ←
      </button>

      <div className="detail-content">
        <img
          className="detail-image"
          src="https://via.placeholder.com/500x300"
          alt={exhibition.title}
        />

        <h1 className="detail-title">{exhibition.title}</h1>

        <div className="detail-info">
          <div className="info-item">
            <span className="info-icon"></span>
            <span className="info-text">{exhibition.address}</span>
          </div>

          <div className="info-item">
            <span className="info-icon"></span>
            <span className="info-text">{exhibition.author || "작가 미상"}</span>
          </div>

          <div className="info-item">
            <span className="info-icon"></span>
            <span className="info-text">
              {exhibition.startDate} ~ {exhibition.endDate}
            </span>
          </div>

          <div className="info-item">
            <span className="info-icon"></span>
            <span className="info-text">
              {formatTime(exhibition.openTime)} ~ {formatTime(exhibition.closeTime)}
            </span>
          </div>
        </div>

        <div className="detail-tags">
          {exhibition.tags && exhibition.tags.map((tag, idx) => (
            <div key={idx} className="detail-tag">
              {tag.tagName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetailPage;
