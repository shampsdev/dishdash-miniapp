import { Location } from './location.interface';

export interface Settings {
  location: Location;
  priceMin: number;
  priceMax: number;
  maxDistance: number;
  tags: number[];
}
