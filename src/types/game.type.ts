export type Game = {
  id: number;
  cards: Card[];
};

export type Card = {
  id?: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
};

export type CardSwipeDirection = "left" | "right";
export type IsDragOffBoundary = "left" | "right" | null;
