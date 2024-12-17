import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/shared/hooks/useAuth';
import {
  MainButton,
  useExpand,
  useThemeParams,
  useWebApp
} from '@vkruglikov/react-telegram-web-app';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ZoomControls } from '@/components/zoomControls';

import 'leaflet-rotate';
import L from 'leaflet';

export const MapPage = () => {
  const { user } = useAuth();
  const [colorScheme] = useThemeParams();

  const navigate = useNavigate();

  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const webApp = useWebApp();
  const { enableVerticalSwipes, disableVerticalSwipes } = webApp;
  const [isExpanded, expand] = useExpand();

  const setMainScreen = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!isExpanded) expand();
    disableVerticalSwipes();

    webApp.BackButton.show();
    webApp.BackButton.onClick(setMainScreen);

    return () => {
      enableVerticalSwipes();

      webApp.BackButton.hide();
      webApp.BackButton.offClick(setMainScreen);
    };
  }, [isExpanded]);

  const MapEvents = () => {
    const map = useMap();

    useMapEvents({
      moveend(e) {
        const newCenter = e.target.getCenter();
        // Only update position if it has actually changed
        setPosition((prevPosition) => {
          if (
            prevPosition?.lat.toFixed(5) !== newCenter.lat.toFixed(5) ||
            prevPosition?.lon.toFixed(5) !== newCenter.lng.toFixed(5)
          ) {
            return { lat: newCenter.lat, lon: newCenter.lng };
          }
          return prevPosition;
        });
      }
    });

    useEffect(() => {
      // Only update the map view if the position has changed
      if (position) {
        const mapCenter = map.getCenter();
        if (
          position.lat.toFixed(5) !== mapCenter.lat.toFixed(5) ||
          position.lon.toFixed(5) !== mapCenter.lng.toFixed(5)
        ) {
          map.setView([position.lat, position.lon], 15);
        }
      }
      map.invalidateSize();
    }, [position]);

    return null;
  };

  const tileLayerUrl = `https://api.mapbox.com/styles/v1/mikedegeofroy/${colorScheme == 'dark' ? 'cm4ig2arm008q01sf4fjpc8h7' : 'cm4h0xe9d005101sf6lvxdduh'}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlrZWRlZ2VvZnJveSIsImEiOiJja3ZiOGQwc3I0N29uMnVxd2xlbGVyZGQzIn0.11XK5mqIzfLBTfNTYOGDgw&zoomwheel=true`;

  return (
    <div className="h-screen z-[50] relative">
      <div className="absolute p-4 bg-background w-full rounded-b-2xl z-[1000]">
        <h1 className="text-2xl font-medium">Укажите точку</h1>
        <p className="text-muted-foreground">
          А мы подберем лучшие места поблизости!
        </p>
      </div>
      <MapContainer
        className="z-0"
        zoomControl={false}
        attributionControl={false}
        doubleClickZoom={false}
        center={position ? [position.lat, position.lon] : [59.95725, 30.30826]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer url={tileLayerUrl} />
        <MapEvents />

        <ZoomControls />

        <div className="absolute right-3 bottom-3 z-[1000] flex justify-center cursor-pointer rounded-full items-center h-12 w-12 bg-background p-[5px]">
          <Navigation
            fill="var(--primary)"
            color="var(--primary)"
            strokeWidth={3}
            className="-translate-x-[8%] translate-y-[8%]"
          />
        </div>

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
      </MapContainer>
      <MainButton text="Выбрать"></MainButton>
    </div>
  );
};
