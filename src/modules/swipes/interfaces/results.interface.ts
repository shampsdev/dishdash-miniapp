import { Card } from './card.interface';
import { User } from '../../../shared/interfaces/user.interface';

interface ResultCard {
  card: Card;
  likes: User[];
}

export interface Result {
  top: ResultCard[];
}
