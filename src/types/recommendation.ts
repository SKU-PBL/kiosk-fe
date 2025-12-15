export interface Question {
  id: number;
  category: string;
  content: string;
  leftTag: string;
  rightTag: string;
  leftImageUrl: string;
  rightImageUrl: string;
}

export interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: Question[];
}

export interface UserChoice {
  questionId: number;
  selectedTag: string;
  weight: number;
}

export interface RecommendTag {
  tagName: string;
  tagDescription: string;
  score: number;
}

export interface RecommendExhibition {
  id: number;
  title: string;
  description: string;
  address: string;
  author: string;
  startDate: string;
  endDate: string;
  openTime: string;
  closeTime: string;
  tags: { tagName: string; tagDescription: string }[];
  views: number;
  imagesUrls: string[];
  galleryName: string;
  phoneNum: string;
  naverCount: number;
}

export interface RecommendResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    topTags: RecommendTag[];
    exhibitions: RecommendExhibition[];
  };
}
