import { Tag } from './tag.interface';

export interface Settings {
  priceMin: number; 
  priceMax: number;
  maxDistance: number; 
  tags: Tag[]; 
}