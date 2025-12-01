import React, { useEffect, useState } from "react";
import ExhibitionCard from "../components/ExhibitionCard";
import TagButton from "../components/TagButton";

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

const ExhibitionPage: React.FC = () => {
  const [data, setData] = useState<Exhibition[]>([]);
  const [filteredData, setFilteredData] = useState<Exhibition[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("/dummy/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("데이터 파일을 찾을 수 없습니다.");
        return res.json();
      })
      .then((json: Exhibition[]) => {
        setData(json);
        setFilteredData(json);

        // 갤러리 이름을 태그로 사용
        const galleryCount: Record<string, number> = {};
        json.forEach((item) => {
          if (item.galleryName) {
            galleryCount[item.galleryName] = (galleryCount[item.galleryName] || 0) + 1;
          }
        });

        const sortedTags = Object.keys(galleryCount).sort(
          (a, b) => galleryCount[b] - galleryCount[a]
        );
        setPopularTags(sortedTags.slice(0, 6));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleTagClick = (tag: string) => {
    const filtered = data.filter((item) => item.galleryName === tag);
    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setFilteredData(data);
  };

  return (
    <div className="container">
      <header className="filters">
        <div className="top-buttons">
          <button className="pill hot" onClick={resetFilter}>
            HOT
          </button>
          <button className="pill">주변 전시회</button>
          <button className="pill">전시회 추천</button>
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
        {filteredData.map((item, index) => (
          <ExhibitionCard key={index} exhibition={item} />
        ))}
      </main>
    </div>
  );
};

export default ExhibitionPage;
