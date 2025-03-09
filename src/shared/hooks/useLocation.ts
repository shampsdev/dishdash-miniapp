import { useShowPopup, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect, useState } from 'react';
import { Location } from '../interfaces/location.interface';

export const useLocation = () => {
  const showPopup = useShowPopup();

  const WebApp = useWebApp();
  const LocationManager = WebApp.LocationManager;
  LocationManager.init();

  const [available, setAvailable] = useState(false);

  useEffect(() => {
    console.log(LocationManager.isInited);

    setAvailable(LocationManager.isAccessGranted);
    if (!LocationManager.isAccessGranted) {
      console.info('The location manager is unavailable on this device.');
      return;
    }

    const handleEvent = (e: any) => {
      console.log(e);
    };

    WebApp.onEvent('locationManagerUpdated', handleEvent);
    return () => WebApp.offEvent('locationManagerUpdated', handleEvent);
  }, []);

  const getLocation = () => {
    setAvailable(LocationManager.isAccessGranted);
    const promise = new Promise<Location>((resolve, reject) => {
      LocationManager.getLocation(
        (location: { latitude: number; longitude: number }) => {
          if (location) {
            const { latitude, longitude } = location;
            resolve({ lat: latitude, lon: longitude });
          } else {
            console.error('Failed to retrieve location');
            reject();
          }
        }
      );
    });

    return promise;
  };

  const tryGetLocation = async (): Promise<Location | null> => {
    try {
      const location = await getLocation();
      return location;
    } catch {
      const id = await showPopup({
        message: 'Чтобы использовать этот функционал надо включить геолокацию.',
        buttons: [
          {
            id: 'cancel',
            text: 'Отмена'
          },
          {
            id: 'ok',
            text: 'Хорошо'
          }
        ]
      });

      if (id === 'ok') {
        LocationManager.openSettings();
      }

      return null;
    }
  };

  return {
    tryGetLocation,
    available,
    getLocation,
    LocationManager
  };
};
