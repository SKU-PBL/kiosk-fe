import React from "react";

interface Exhibition {
  title: string;
  operatingDay: string;
  address: string;
  galleryName: string;
  operatingHour: string;
  imageUrl: string[];
  artist: string;
  description: string;
}

const ExhibitionCard: React.FC<{ exhibition: Exhibition }> = ({ exhibition }) => (
  <article className="card">
    <img 
      className="thumb" 
      src={exhibition.imageUrl && exhibition.imageUrl[0] ? exhibition.imageUrl[0] : "https://via.placeholder.com/200"} 
      alt={exhibition.title} 
    />
    <div className="card-body">
      <h3 className="title">{exhibition.title}</h3>
      <div className="artist">{exhibition.artist || "작가 미상"}</div>
      <div className="addr">{exhibition.galleryName} - {exhibition.address}</div>
      <div className="date">{exhibition.operatingDay}</div>
      <div className="card-tags">
        <div className="tag">{exhibition.galleryName}</div>
      </div>
    </div>
  </article>
);

export default ExhibitionCard;
