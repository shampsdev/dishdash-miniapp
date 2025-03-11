import { Card } from '@/modules/swipes/interfaces/card.interface';

export interface Collection {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  places: Card[];
}
