import { Tag } from '@/shared/interfaces/tag.interface';

export interface Card {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  url: string | null;
  location: {
    lat: number;
    lon: number;
  };
  address: string;
  priceAvg: number;
  reviewRating: number;
  reviewCount: number;
  tags: Tag[];
  updatedAt: Date;
  boost: number | null;
}

export type CardSwipeDirection = 'left' | 'right';
export type IsDragOffBoundary = 'left' | 'right' | null;
