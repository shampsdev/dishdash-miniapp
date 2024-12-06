import { Avatar } from '@/components/ui/avatar';
import { nearestLobby, postLobby } from '@/shared/api/lobby.api';
import { useAuth } from '@/shared/hooks/useAuth';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { useShowPopup, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { PanInfo, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

interface MapButtonProps {
  onMapOpenUpdate?: (open: boolean) => void;
}

export const MapButton = ({ onMapOpenUpdate }: MapButtonProps) => {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [showMap, setShowMap] = useState(false);
  const showPopup = useShowPopup();
  const navigate = useNavigate();
  const { LocationManager, Accelerometer } = useWebApp();

  const [animationComplete, setAnimationComplete] = useState(false);

  const { resetStore } = useLobbyStore();
  const { user } = useAuth();

  useEffect(() => {
    LocationManager.init();

    Accelerometer.start({ refresh_rate: 100 });

    let lastMagnitude = 0;
    const threshold = 15;

    const interval = setInterval(async () => {
      const newX = Accelerometer.x;
      const newY = Accelerometer.y;
      const newZ = Accelerometer.z;

      const magnitude = Math.sqrt(newX ** 2 + newY ** 2 + newZ ** 2);

      if (Math.abs(magnitude - lastMagnitude) > threshold) {
        LocationManager.getLocation(
          async (location: { latitude: number; longitude: number }) => {
            if (location) {
              const { latitude, longitude } = location;
              const lobby = await nearestLobby({
                lat: latitude,
                lon: longitude,
              });
              navigate(`/${lobby?.id}`);
              resetStore();
            }
          },
        );

        clearInterval(interval);
        Accelerometer.stop();
      }

      lastMagnitude = magnitude;
    }, 100);

    return () => {
      clearInterval(interval);
      Accelerometer.stop();
    };
  }, []);

  useEffect(() => {
    if (onMapOpenUpdate) onMapOpenUpdate(showMap);
  }, [showMap]);

  const handleClick = async () => {
    if (!showMap) {
      if (LocationManager.isLocationAvailable) {
        if (LocationManager.isAccessGranted) {
          LocationManager.getLocation(
            (location: { latitude: number; longitude: number }) => {
              if (location) {
                const { latitude, longitude } = location;
                setPosition({ lat: latitude, lon: longitude });
                setShowMap(true);
              }
            },
          );
        } else if (
          !LocationManager.isAccessGranted &&
          !LocationManager.isAccessRequested
        ) {
          LocationManager.getLocation(
            (location: { latitude: number; longitude: number }) => {
              if (location) {
                const { latitude, longitude } = location;
                setPosition({ lat: latitude, lon: longitude });
                setShowMap(true);
              }
            },
          );
        } else if (
          !LocationManager.isAccessGranted &&
          LocationManager.isAccessRequested
        ) {
          showPopup({
            title: 'Настройки геолокации',
            message:
              'Включите геолокацию, чтобы найти крутые места рядом с вами!',
            buttons: [
              {
                text: 'Хорошо!',
                id: 'ok',
              },
              {
                text: 'Не сейчас',
                id: 'not-now',
              },
            ],
          }).then((id) => {
            if (id == 'ok') {
              LocationManager.openSettings();
            } else {
              setPosition({ lat: 59.957504, lon: 30.308039 });
              setShowMap(true);
            }
          });
        }
      } else {
        setPosition({ lat: 59.957504, lon: 30.308039 });
        setShowMap(true);
      }
    } else {
      if (position) {
        const lobby = await postLobby(position);
        navigate(`/${lobby?.id}`);
        resetStore();
      }
    }
  };

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
      },
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
    }, [animationComplete, position]);

    return null;
  };

  const onDragAction = (_: any, info: PanInfo) => {
    if (info.delta.y < 20) setShowMap(false);
  };

  return (
    <div className="pointer-events-none flex h-fit space-y-5 flex-col justify-end items-center pb-8 w-full relative">
      {showMap && (
        <motion.div
          onPan={onDragAction}
          className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
          onClick={() => setShowMap(false)}
        />
      )}

      <div className="relative w-full h-fit">
        <motion.div
          animate={{ height: showMap ? '40vh' : 0 }}
          onAnimationStart={() => setAnimationComplete(false)}
          onAnimationComplete={() => setAnimationComplete(true)}
          transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
          className="w-full z-50 top-2 pointer-events-auto relative mx-auto rounded-t-xl overflow-hidden"
        >
          <motion.div
            onPan={onDragAction}
            className="z-[1000] flex items-center justify-center w-full h-8 top-0 absolute"
          >
            <div className="w-16 h-1 bg-[rgba(255,255,255,0.5)] rounded-xl z-[1000]"></div>
          </motion.div>
          <MapContainer
            zoomControl={false}
            attributionControl={false}
            center={
              position ? [position.lat, position.lon] : [59.95725, 30.30826]
            }
            zoom={15}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlrZWRlZ2VvZnJveSIsImEiOiJja3ZiOGQwc3I0N29uMnVxd2xlbGVyZGQzIn0.11XK5mqIzfLBTfNTYOGDgw" />
            <MapEvents />
          </MapContainer>

          {/* Marker icon centered over the map */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationComplete ? 1 : 0 }}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          >
            {user && (
              <Avatar
                src={user.avatar}
                style={{ width: '30px', height: '30px' }}
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
        </motion.div>
        <div
          onClick={handleClick}
          className="z-50 cursor-pointer relative bottom-0 pointer-events-auto flex justify-center text-accent-foreground items-center rounded-lg bg-primary w-full h-14 active:opacity-95 font-medium"
        >
          {showMap ? 'Создать Лобби' : 'Начать'}
        </div>
      </div>
    </div>
  );
};
