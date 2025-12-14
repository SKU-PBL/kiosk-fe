import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const apiUrl = isDev 
      ? `/api/exhibition/${id}`
      : `https://api.insa-exhibition.shop/api/exhibition/${id}`;
    
    fetch(apiUrl)
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

  if (loading) return <div className="detail-container">로딩 중...</div>;
  if (!exhibition) return <div className="detail-container">전시회 정보를 불러올 수 없습니다.</div>;

  const images = exhibition.imagesUrls && exhibition.imagesUrls.length > 0
    ? exhibition.imagesUrls
    : ["https://via.placeholder.com/500x300"];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate("/")}>←</button>

      <div className="detail-content">
        <h1 className="detail-title">{exhibition.title}</h1>
        <p className="detail-author">{exhibition.author || "작가 미상"}</p>

        <div className={`image-gallery ${images.length <= 2 ? 'gallery-horizontal' : 'gallery-grid'}`}>
          {images.map((img, index) => (
            <img
              key={index}
              className="gallery-image"
              src={img}
              alt={`${exhibition.title} ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>

        <div className="detail-info">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span className="info-text">{exhibition.address}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📅</span>
            <span className="info-text">
              {exhibition.startDate} ~ {exhibition.endDate}
            </span>
          </div>
          <div className="info-item">
            <span className="info-icon">🕐</span>
            <span className="info-text">
              {exhibition.openTime} ~ {exhibition.closeTime}
            </span>
          </div>
          <div className="info-item">
            <span className="info-icon">☎</span>
            <span className="info-text">{exhibition.phoneNum}</span>
          </div>       
        </div>

        {exhibition.description && (
          <p className="info-text" style={{ marginBottom: 12, whiteSpace: "pre-wrap" }}>
            {exhibition.description}
          </p>
        )}

        <div className="detail-tags">
          {exhibition.tags && exhibition.tags.map((tag, idx) => (
            <div key={idx} className="detail-tag">
              {tag.tagName}
            </div>
          ))}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <div className="image-modal" onClick={handleCloseModal}>
          <button className="modal-close" onClick={handleCloseModal}>✕</button>
          <button 
            className="modal-nav modal-prev" 
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
            disabled={selectedImageIndex === 0}
          >
            ‹
          </button>
          <img
            className="modal-image"
            src={images[selectedImageIndex]}
            alt={`${exhibition.title} ${selectedImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className="modal-nav modal-next" 
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
            disabled={selectedImageIndex === images.length - 1}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default ExhibitionDetailPage;
