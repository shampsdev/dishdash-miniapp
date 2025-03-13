import { useEffect, useState } from 'react';
import { Location } from '../interfaces/location.interface';
import { locationManager, popup } from '@telegram-apps/sdk-react';

export const useLocation = () => {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    setAvailable(locationManager.isAccessGranted);
    if (!locationManager.isAccessGranted) {
      console.info('The location manager is unavailable on this device.');
      return;
    }
  }, []);

  const getLocation = () => {
    setAvailable(locationManager.isAccessGranted);
    const promise = new Promise<Location>((resolve, reject) => {
      locationManager
        .requestLocation()
        .then((location: { latitude: number; longitude: number }) => {
          if (location) {
            const { latitude, longitude } = location;
            resolve({ lat: latitude, lon: longitude });
          } else {
            console.error('Failed to retrieve location');
            reject();
          }
        });
    });

    return promise;
  };

  const tryGetLocation = async (): Promise<Location | null> => {
    try {
      const location = await getLocation();
      return location;
    } catch {
      const id = await popup.open({
        message: 'Чтобы использовать этот функционал надо включить геолокацию.',
        buttons: [
          {
            id: 'cancel',
            type: 'default',
            text: 'Отмена'
          },
          {
            id: 'ok',
            type: 'default',
            text: 'Хорошо'
          }
        ]
      });

      if (id === 'ok') {
        locationManager.openSettings();
      }

      return null;
    }
  };

  return {
    tryGetLocation,
    available,
    getLocation,
    locationManager
  };
};
