import { Location } from '@/shared/interfaces/location.interface';
import { ClassicPlacesRecommendation } from './recommendation.interface';

export type SettingsType = 'classicPlaces' | 'collectionPlaces';

export interface Settings {
  type: SettingsType;
}

export const isClassicPlaces = (
  settings: Settings
): settings is ClassicPlacesSettings => {
  return settings.type === 'classicPlaces';
};

export const isCollectionPlaces = (
  settings: Settings
): settings is CollectionPlacesSettings => {
  return settings.type === 'collectionPlaces';
};
export interface ClassicPlacesSettings extends Settings {
  type: 'classicPlaces';
  classicPlaces: {
    location: Location;
    priceAvg: number;
    tags: number[];
    recommendation: null | ClassicPlacesRecommendation;
  };
}

export interface CollectionPlacesSettings extends Settings {
  type: 'collectionPlaces';
  collectionPlaces: {
    collectionId: string;
    location: Location;
  };
}
