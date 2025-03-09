import { getDistance } from './distance.util';
import { Location } from '../interfaces/location.interface';

export const getTime = (from: Location, to: Location): string => {
  const walkingSpeed = 5;
  const distance = getDistance(from, to);

  const timeInHours = distance / walkingSpeed;

  if (timeInHours < 1) {
    const minutes = Math.round(timeInHours * 60);
    return `${minutes} мин`;
  } else {
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);
    if (minutes === 0) {
      return `${hours} ч`;
    } else {
      return `${hours} ч ${minutes} мин`;
    }
  }
};
