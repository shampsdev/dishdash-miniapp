import { useEffect, useState, useRef } from 'react';
import { MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

import Map, { MapRef, ViewStateChangeEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import stations from '@/assets/stations.json';
import lines from '@/assets/lines.json';
import { Station } from '@/modules/swipes/interfaces/station.interface';
import DARK_MAP_STYLE from '@/assets/monochrome-dark.json';
import LIGHT_MAP_STYLE from '@/assets/monochrome-light.json';

import { ZoomControls } from '@/modules/map/components/zoomControls';
import { Avatar } from '@/components/ui/avatar';

import useTheme from '@/shared/hooks/useTheme';
import { useAuth } from '@/shared/hooks/useAuth';
import { postLobby } from '@/shared/api/lobby.api';
import { useLobbyStore } from '@/modules/swipes/stores/lobby.store';
import { MetroMarker } from '@/modules/swipes/components/metroMarker';
import { NavigationButton } from '@/modules/map/components/navigationButton';
import { useLocation } from '@/shared/hooks/useLocation';
import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { MAPBOX_TOKEN } from '@/shared/constants';

export const MapPage = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { available, tryGetLocation, getLocation } = useLocation();

  const defaultMapStyle: any = darkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;

  const navigate = useNavigate();
  const webApp = useWebApp();

  const { resetStore } = useLobbyStore();
  const { enableVerticalSwipes, disableVerticalSwipes } = useWebApp();

  const [zoom, setZoom] = useState(12);
  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const [mapMoved, setMapMoved] = useState(true);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const updatedMapStyle = darkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;
    setMapStyle(updatedMapStyle);
  }, [darkMode]);

  const setMainScreen = () => {
    navigate('/');
  };

  useEffect(() => {
    getLocation().then((location) => {
      console.log(location);
      if (location && mapRef.current) {
        mapRef.current.flyTo({
          center: [location.lon, location.lat],
          zoom: 16,
          duration: 1000
        });
      }
    });

    disableVerticalSwipes();

    webApp.BackButton.show();
    webApp.BackButton.onClick(setMainScreen);

    return () => {
      enableVerticalSwipes();
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setMainScreen);
    };
  }, []);

  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        zoom: mapRef.current.getZoom() + 1,
        duration: 500
      });
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        zoom: mapRef.current.getZoom() - 1,
        duration: 500
      });
    }
  };

  const onZoom = (e: ViewStateChangeEvent) => {
    setZoom(e.viewState.zoom);
  };

  const onMainButtonClick = async () => {
    if (mapRef.current) {
      const mapCenter = mapRef.current.getCenter();
      const position = {
        lat: mapCenter.lat,
        lon: mapCenter.lng
      };

      const settings: ClassicPlacesSettings = {
        type: 'classicPlaces',
        classicPlaces: {
          location: position,
          priceAvg: 1200,
          tags: [],
          recommendation: null
        }
      };

      try {
        const lobby = await postLobby(settings);
        if (lobby?.id) {
          navigate(`/${lobby.id}`);
          resetStore();
        }
      } catch (error) {
        console.error('Failed to create lobby:', error);
      }
    } else {
      console.error('Map reference is unavailable');
    }
  };

  const onNavigationButtonClick = async () => {
    const location = await tryGetLocation();
    console.log(location);
    if (mapRef.current) {
      if (location) {
        setMapMoved(false);
        mapRef.current.flyTo({
          center: [location.lon, location.lat],
          zoom: 16,
          duration: 1000
        });
      }
    } else {
      console.error('Map reference is unavailable');
    }
  };

  const getCentered = async () => {
    const userLocation = await getLocation();
    if (mapRef.current && userLocation) {
      const mapCenter = mapRef.current.getCenter();
      const isCentered =
        Math.abs(mapCenter.lat - userLocation.lat) < 0.00001 &&
        Math.abs(mapCenter.lng - userLocation.lon) < 0.00001;

      return isCentered;
    }
    return false;
  };

  const checkCentered = async () => {
    const centered = await getCentered();
    if (centered) {
      setMapMoved(false);
    } else {
      setMapMoved(true);
    }
  };

  return (
    <div className="h-screen w-svh z-[50] relative">
      <div className="absolute p-4 bg-background w-full rounded-b-2xl z-[1000]">
        <h1 className="text-2xl font-medium">Укажите точку</h1>
        <p className="text-muted-foreground">
          А мы подберем лучшие места поблизости!
        </p>
      </div>
      <Map
        initialViewState={{
          latitude: 59.945276,
          longitude: 30.312183,
          zoom: zoom
        }}
        onZoom={onZoom}
        mapStyle={mapStyle}
        attributionControl={false}
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        onMoveStart={async () => {
          const center = await getCentered();
          if (center) setMapMoved(true);
        }}
        onMoveEnd={checkCentered}
      >
        {zoom >= 8 &&
          stations.map((station: Station, index) => (
            <MetroMarker
              key={`station_${index}`}
              darkMode={darkMode}
              station={station}
              style={{
                transform: `scale(${zoom / 15})`,
                transformOrigin: 'center',
                willChange: 'transform'
              }}
              textVisible={zoom >= 10}
              // @ts-expect-error this is taken from raw json
              fill={lines[station.line]}
            />
          ))}
      </Map>
      <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} />
      {available && (
        <NavigationButton
          onClick={onNavigationButtonClick}
          active={!mapMoved}
        />
      )}
      <div className="z-[1000] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute pointer-events-none">
        {user && (
          <Avatar
            src={user.avatar}
            style={{
              borderColor: 'var(--primary)',
              maxWidth: '40px',
              maxHeight: '40px',
              borderWidth: '3px'
            }}
          />
        )}
      </div>
      <MainButton onClick={onMainButtonClick} text="Выбрать" />
    </div>
  );
};
