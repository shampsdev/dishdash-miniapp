import { Card } from './card.interface';
import { Match } from './match.interface';

export interface Result {
  result: Card;
  matches: Match[];
}
