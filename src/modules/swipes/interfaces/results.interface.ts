import { User } from '@/shared/interfaces/user.interface';
import { Card } from './card.interface';

export interface ResultItem {
  card: Card;
  likes: User[];
}

export interface Result {
  top: ResultItem[];
}
