import { ICategory } from './categories';

export interface ISize {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IProduct {
  name: string;
  id: string;
  slug: string;
  photos: IPhoto[];
  price: number;
  sizes: string[] | ISize[];
  sale?: {
    campaing_label: string;
    campaing: string;
    discount: number;
    badge: string;
    start_date: Date;
    end_date: Date;
  };
}

export interface IProductsList {
  per_page: number;
  pages: number;
  page: number;
  total: number;
  count: number;
  products: IProduct[];
  category?: string;
  links: { next?: string; previous?: string };
}

export interface IReviewsList {
  per_page: number;
  pages: number;
  page: number;
  count: number;
  average_rate: number;
  reviews: IReview[];
  links: { next?: string; previous?: string };
}

export interface IReview {
  id: string;
  user: { firstname: string; lastname: string };
  title: string;
  content: string;
  recommend: boolean;
  rating: number;
  updated_at: Date;
  helpful: { yes: number; no: number };
}

export interface IPhoto {
  id?: string;
  url: string;
  description: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface IProductDetails extends IProduct {
  description: string;
  sizes: ISize[];
  created_at?: Date;
  updated_at?: Date;
  photos: IPhoto[];
  categories: ICategory[];
}
