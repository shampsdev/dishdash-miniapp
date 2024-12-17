import { useEffect, useState, useRef } from 'react';
import {
  MainButton,
  useExpand,
  useWebApp
} from '@vkruglikov/react-telegram-web-app';
import Map, { MapRef } from 'react-map-gl';
import DARK_MAP_STYLE from '@/assets/monochrome-dark.json';
import LIGHT_MAP_STYLE from '@/assets/monochrome-light.json';
import { useNavigate } from 'react-router-dom';
import useTheme from '@/shared/hooks/useTheme';
import { ZoomControls } from '@/components/zoomControls';
import { Navigation } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/shared/hooks/useAuth';
import { motion } from 'framer-motion';
import { postLobby } from '@/shared/api/lobby.api';
import { useLobbyStore } from '@/shared/stores/lobby.store';

export const MapPage = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const defaultMapStyle: any = darkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;

  const navigate = useNavigate();
  const webApp = useWebApp();
  const { resetStore } = useLobbyStore();

  const { LocationManager, enableVerticalSwipes, disableVerticalSwipes } =
    webApp;
  const [isExpanded, expand] = useExpand();

  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const mapRef = useRef<MapRef>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [mapMoved, setMapMoved] = useState(false);

  const setMainScreen = () => {
    navigate('/');
  };

  useEffect(() => {
    const updatedMapStyle = darkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;
    setMapStyle(updatedMapStyle);
  }, [darkMode]);

  useEffect(() => {
    if (!isExpanded) expand();
    disableVerticalSwipes();
    LocationManager.init();

    webApp.BackButton.show();
    webApp.BackButton.onClick(setMainScreen);

    return () => {
      enableVerticalSwipes();
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setMainScreen);
    };
  }, [isExpanded]);

  useEffect(() => {
    fetchUserLocation();
  }, [LocationManager.isAccessGranted]);

  const checkMapPosition = () => {
    if (mapRef.current && userLocation) {
      const mapCenter = mapRef.current.getCenter();
      const isCentered =
        Math.abs(mapCenter.lat - userLocation.latitude) < 0.00001 &&
        Math.abs(mapCenter.lng - userLocation.longitude) < 0.0001;

      setMapMoved(!isCentered);
    }
  };

  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        zoom: mapRef.current.getZoom() + 1,
        duration: 500
      });
      checkMapPosition();
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        zoom: mapRef.current.getZoom() - 1,
        duration: 500
      });
      checkMapPosition();
    }
  };

  const fetchUserLocation = () => {
    if (LocationManager.isAccessGranted) {
      LocationManager.getLocation(
        (location: { latitude: number; longitude: number }) => {
          if (location) {
            const { latitude, longitude } = location;

            setUserLocation({ latitude, longitude });

            if (mapRef.current) {
              mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 16,
                duration: 1000
              });
            }
            setMapMoved(false);
          } else {
            console.error('Failed to retrieve location');
          }
        }
      );
    }
  };

  const onMainButtonClick = async () => {
    if (mapRef.current) {
      const mapCenter = mapRef.current.getCenter();
      const position = {
        lat: mapCenter.lat,
        lon: mapCenter.lng
      };
      try {
        const lobby = await postLobby(position);
        console.log(lobby);
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
          latitude: userLocation?.latitude || 59.945276,
          longitude: userLocation?.longitude || 30.312183,
          zoom: 5.5
        }}
        mapStyle={mapStyle}
        ref={mapRef}
        mapboxAccessToken={
          'pk.eyJ1IjoibWlrZWRlZ2VvZnJveSIsImEiOiJja3ZiOGQwc3I0N29uMnVxd2xlbGVyZGQzIn0.11XK5mqIzfLBTfNTYOGDgw'
        }
        onMove={checkMapPosition}
      />
      <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} />
      {LocationManager.isAccessGranted && (
        <div
          className="absolute right-3 bottom-3 z-[1000] flex justify-center cursor-pointer rounded-full items-center h-12 w-12 bg-background p-[5px]"
          onClick={fetchUserLocation}
        >
          <Navigation
            fill={!mapMoved ? 'var(--primary)' : 'none'}
            color="var(--primary)"
            strokeWidth={3}
            className="-translate-x-[8%] translate-y-[8%]"
          />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}
      >
        {user && (
          <Avatar
            src={user.avatar}
            style={{
              borderColor: 'var(--primary)',
              maxWidth: '40px',
              maxHeight: '40px',
              borderWidth: '3px'
            }}
            fallback={'?'}
            fallbackElement={
              <span className="text-[10px] font-medium text-primary">
                {user?.name
                  .split(' ')
                  .slice(0, 2)
                  .map((x) => x.charAt(0))
                  .join('')
                  .toUpperCase()}
              </span>
            }
          />
        )}
      </motion.div>
      <MainButton onClick={onMainButtonClick} text="Выбрать" />
    </div>
  );
};
