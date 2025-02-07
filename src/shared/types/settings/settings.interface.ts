import { Location } from '@/shared/types/location.interface';
import { ClassicPlacesRecommendation } from './recommendation.interface';

export type SettingsType = 'classicPlaces' | 'collectionPlaces';

export interface Settings {
  type: SettingsType;
}

export interface ClassicPlacesSettings extends Settings {
  type: 'classicPlaces';
  classicPlaces: {
    location: Location;
    priceAvg: number;
    tags: number[];
    recommendation: null | ClassicPlacesRecommendation;
  };
}

export interface CollectionPlacesSettigns extends Settings {
  type: 'collectionPlaces';
  collectionPlaces: {
    collectionId: string;
    location: Location;
  };
}
