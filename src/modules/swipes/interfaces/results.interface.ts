import { Card } from './card.interface';
import { User } from '../../../shared/interfaces/user.interface';

export interface ResultItem {
  card: Card;
  likes: User[];
}

export interface Result {
  top: ResultItem[];
}
