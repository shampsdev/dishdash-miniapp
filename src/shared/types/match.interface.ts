import { Card } from './card.interface';
import { Vote } from './vote.interface';

export interface Match extends Vote {
  type: 'match';
  card: Card;
}
