export interface BreadType {
  id: number;
  name: string;
  category: number;
  price: number;
  images: {
    official: string;
    real: string | null;
  };
  taste: {
    description: string;
    keywords: string[];
  };
  tip: string;
  confusing: string[];
  reviews: string[];
  isbest: boolean;
  isnew: boolean;
}

export interface CategoryType {
  id: number;
  name: string;
}

export interface NewsItemType {
  date: string;
  message: string;
}
