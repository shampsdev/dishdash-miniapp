import { Location } from '../interfaces/location.interface';

export const getDistance = (from: Location, to: Location): number => {
  const R = 6371;
  const dLat = degToRad(to.lat - from.lat);
  const dLon = degToRad(to.lon - from.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(from.lat)) *
      Math.cos(degToRad(to.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const degToRad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
