export type RecommendationType = 'classic';

export interface ClassicPlacesRecommendation {
  type: RecommendationType;
  recommendation: ClassicPlacesClassicRecomendation;
}

export interface ClassicPlacesClassicRecomendation
  extends ClassicPlacesRecommendation {
  classic: {
    distBound: number;
    distCoeff: number;
    distPower: number;
    priceBound: number;
    priceCoeff: number;
    pricePower: number;
  };
}
