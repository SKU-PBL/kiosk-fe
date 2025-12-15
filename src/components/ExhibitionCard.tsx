import React from "react";
import { useNavigate } from "react-router-dom";

interface Tag {
  tagName: string;
  tagDescription: string;
}

interface Exhibition {
  id: number;
  title: string;
  description: string;
  address: string;
  author: string;
  startDate: string;
  endDate: string;
  openTime: string;
  closeTime: string;
  tags: Tag[];
  views: number;
  imagesUrls: string[];
  galleryName: string;
  phoneNum: string;
}

const ExhibitionCard: React.FC<{ exhibition: Exhibition }> = ({ exhibition }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/exhibition/${exhibition.id}`);
  };

  const thumbSrc = exhibition.imagesUrls && exhibition.imagesUrls[0]
    ? exhibition.imagesUrls[0]
    : "https://via.placeholder.com/200";

  return (
    <article className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img 
        className="thumb" 
        src={thumbSrc} 
        alt={exhibition.title} 
      />
      <div className="card-body">
        <h3 className="title">{exhibition.title}</h3>
        <div className="artist">{exhibition.author || "작가 미상"}</div>
        <div className="addr">{exhibition.address}</div>
        <div className="date">{exhibition.startDate} ~ {exhibition.endDate}</div>
        <div className="card-tags">
          {Array.isArray(exhibition.tags) && exhibition.tags.map((tag, idx) => (
            <div key={idx} className="tag">{tag.tagDescription}</div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ExhibitionCard;
