import { useEffect, useState } from 'react';

import { MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { postLobby } from '@/shared/api/lobby.api';
import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { Location } from '@/modules/swipes/interfaces/location.interface';
import { useNavigate } from 'react-router-dom';
import { SelectPointMap } from '@/modules/map/select-point-map';

export const MapPage = () => {
  const webApp = useWebApp();
  const navigate = useNavigate();

  const [location, setLocation] = useState<Location>({ lat: 0, lon: 0 });

  useEffect(() => {
    webApp.BackButton.show();
    webApp.BackButton.onClick(setMainScreen);

    return () => {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setMainScreen);
    };
  }, []);

  const setMainScreen = () => {
    navigate('/');
  };

  const onMainButtonClick = async () => {
    const settings: ClassicPlacesSettings = {
      type: 'classicPlaces',
      classicPlaces: {
        location,
        priceAvg: 1200,
        tags: [],
        recommendation: null
      }
    };

    try {
      const lobby = await postLobby(settings);
      if (lobby?.id) {
        navigate(`/${lobby.id}/lobby`);
      }
    } catch (error) {
      console.error('Failed to create lobby:', error);
    }
  };

  const onPointChange = (point: Location) => {
    setLocation(point);
  };

  return (
    <div className="h-screen w-svh z-[50] relative">
      <div className="absolute p-4 bg-background w-full rounded-b-2xl z-[1000]">
        <h1 className="text-2xl font-medium">Укажите точку</h1>
        <p className="text-muted-foreground">
          А мы подберем лучшие места поблизости!
        </p>
      </div>
      <SelectPointMap onPointChange={onPointChange} />
      <MainButton onClick={onMainButtonClick} text="Выбрать" />
    </div>
  );
};
