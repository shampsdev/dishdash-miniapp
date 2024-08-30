import { Tag } from './tag.type';

export type Game = {
  id: number;
  cards: Card[];
};

export type Card = {
  id: number;
  title: string;
  shortВescription: string;
  description: string;
  image: string;
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
};

export type Match = {
  id: number;
  card: Card;
};

export type CardSwipeDirection = 'left' | 'right';
export type IsDragOffBoundary = 'left' | 'right' | null;
