import React from "react";
import { useNavigate } from "react-router-dom";

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

const ExhibitionCard: React.FC<{ exhibition: Exhibition }> = ({ exhibition }) => {
  const navigate = useNavigate();

  const formatTime = (time: { hour: number; minute: number } | null) => {
    if (!time) return "정보 없음";
    return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
  };

  const handleCardClick = () => {
    navigate(`/exhibition/${exhibition.id}`);
  };

  const operatingTime = `${formatTime(exhibition.openTime)} ~ ${formatTime(exhibition.closeTime)}`;

  return (
    <article className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img 
        className="thumb" 
        src="https://via.placeholder.com/200" 
        alt={exhibition.title} 
      />
      <div className="card-body">
        <h3 className="title">{exhibition.title}</h3>
        <div className="artist">{exhibition.author || "작가 미상"}</div>
        <div className="addr">{exhibition.address}</div>
        <div className="date">{exhibition.startDate} ~ {exhibition.endDate}</div>
        <div className="card-tags">
          {Array.isArray(exhibition.tags) && exhibition.tags.map((tag, idx) => (
            <div key={idx} className="tag">{tag.tagName}</div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ExhibitionCard;
