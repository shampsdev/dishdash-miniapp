import { useEffect, useState } from 'react';

import { postLobby } from '@/shared/api/lobby.api';
import {
  ClassicPlacesSettings,
  CollectionPlacesSettings
} from '@/modules/swipes/interfaces/settings/settings.interface';
import { Location } from '@/shared/interfaces/location.interface';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SelectPointMap } from '@/modules/map/select-point-map';
import { backButton, mainButton } from '@telegram-apps/sdk-react';

export const MapPage = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { collectionId } = useParams();

  const [location, setLocation] = useState<Location>({ lat: 0, lon: 0 });

  const setMainScreen = () => {
    navigate('/');
  };

  const onMainButtonClick = async () => {
    console.log(collectionId, pathname);

    const collectionSettings: CollectionPlacesSettings = {
      type: 'collectionPlaces',
      collectionPlaces: {
        location,
        collectionId: collectionId || ''
      }
    };

    const classicSettings: ClassicPlacesSettings = {
      type: 'classicPlaces',
      classicPlaces: {
        location,
        priceAvg: 1200,
        tags: [],
        recommendation: null
      }
    };

    const settings =
      collectionId !== undefined ? collectionSettings : classicSettings;

    try {
      const lobby = await postLobby(settings);
      if (lobby != undefined) {
        navigate(`/${lobby.id}/lobby`);
      }
    } catch (error) {
      console.error('Failed to create lobby:', error);
    }
  };

  const onPointChange = (point: Location) => {
    setLocation(point);
  };

  useEffect(() => {
    backButton.show();
    backButton.onClick(setMainScreen);

    mainButton.setParams({
      text: 'Выбрать',
      isVisible: true
    });
    mainButton.onClick(onMainButtonClick);

    return () => {
      backButton.hide();
      backButton.offClick(setMainScreen);

      mainButton.setParams({
        isVisible: false
      });
      mainButton.offClick(onMainButtonClick);
    };
  }, []);

  return (
    <div className="h-screen w-svh z-[50] relative">
      <div className="absolute p-4 bg-background w-full rounded-b-2xl z-[1000]">
        <h1 className="text-2xl font-medium">Укажите точку</h1>
        <p className="text-muted-foreground">
          А мы подберем лучшие места поблизости!
        </p>
      </div>
      <SelectPointMap
        showNavigationControls
        showZoomControls
        onPointChange={onPointChange}
      />
    </div>
  );
};
