export type Game = {
  id: number;
  cards: Card[];
};

export type CardType = 'BAR' | 'CAFE' | 'RESTAURANT';

export type Card = {
  ID: number;
  Title: string;
  ShortDescription: string;
  Description: string;
  Image: string;
  Location: {
    lat: number;
    lon: number;
  };
  Address: string;
  Type: CardType;
  Price: number;
};

export type Match = {
  id: number;
  card: Card;
};

export type CardSwipeDirection = 'left' | 'right';
export type IsDragOffBoundary = 'left' | 'right' | null;
