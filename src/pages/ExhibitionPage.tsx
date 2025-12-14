import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExhibitionCard from "../components/ExhibitionCard";
import TagButton from "../components/TagButton";

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
  naverCount: number;
}

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: Exhibition[];
}

const ExhibitionPage: React.FC = () => {
  const [data, setData] = useState<Exhibition[]>([]);
  const [filteredData, setFilteredData] = useState<Exhibition[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const loadHotExhibitions = () => {
    console.log("HOT 전시회 로딩 중...");
    
    const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const apiUrl = isDev 
      ? "/api/exhibitions/naver-count"
      : "https://api.insa-exhibition.shop/api/exhibitions/naver-count";
    
    fetch(apiUrl)
      .then((res) => {
        console.log("Response Status:", res.status);
        if (!res.ok) throw new Error("API 요청 실패");
        return res.json();
      })
      .then((response: ApiResponse) => {
        console.log("=== HOT API Response ===");
        console.log("Data Length:", response.data?.length);
        
        if (response.success && response.data) {
          console.log("HOT 데이터 설정 중...", response.data.length, "개");
          setData(response.data);
          setFilteredData(response.data);

          const tagCount: Record<string, number> = {};
          response.data.forEach((item) => {
            if (Array.isArray(item.tags)) {
              item.tags.forEach((tag) => {
                tagCount[tag.tagName] = (tagCount[tag.tagName] || 0) + 1;
              });
            }
          });

          const sortedTags = Object.keys(tagCount).sort(
            (a, b) => tagCount[b] - tagCount[a]
          );
          console.log("Popular Tags:", sortedTags.slice(0, 6));
          setPopularTags(sortedTags.slice(0, 6));
        } else {
          console.error("API 응답 오류:", response.message);
        }
      })
      .catch((err) => {
        console.error("Error Message:", err.message);
      });
  };

  useEffect(() => {
    loadHotExhibitions();
  }, []);

  const handleTagClick = (tag: string) => {
    const filtered = data.filter((item) =>
      item.tags.some((t) => t.tagName === tag)
    );
    setFilteredData(filtered);
  };

  console.log("Current State - Data:", data.length, "Filtered:", filteredData.length);

  return (
    <div className="container">
      <header className="filters">
        <div className="top-buttons">
          <button className="pill hot" onClick={loadHotExhibitions}>
            HOT
          </button>
          <button className="pill">주변 전시회</button>
          <button className="pill" onClick={() => navigate("/recommendation")}>
            전시회 추천
          </button>
          <button className="pill">사진</button>
          <button className="pill">미디어 아트</button>
          <button className="pill">테마</button>
          <button className="pill">회화</button>
          <button className="pill">조각/설치</button>
        </div>

        <h3 className="section-title">인기 태그</h3>
        <div className="tag-row">
          {popularTags.map((tag) => (
            <TagButton key={tag} tag={tag} onClick={() => handleTagClick(tag)} />
          ))}
        </div>
      </header>

      <main className="list">
        {filteredData.map((item) => (
          <ExhibitionCard key={item.id} exhibition={item} />
        ))}
      </main>
    </div>
  );
};

export default ExhibitionPage;
