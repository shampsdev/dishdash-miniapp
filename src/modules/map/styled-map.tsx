import { useEffect, useRef, useState } from 'react';
import { CustomMap } from './components/custom-map';
import { MetroMarker } from './components/metro-marker';
import { Station } from '../swipes/interfaces/station.interface';

import stations from '@/assets/stations.json';
import lines from '@/assets/lines.json';

import { useLocation } from '@/shared/hooks/useLocation';
import { MapRef, ViewStateChangeEvent } from 'react-map-gl';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Location } from '../swipes/interfaces/location.interface';
import useTheme from '@/shared/hooks/useTheme';
import { NavigationButton } from './components/navigation-button';
import { ZoomControls } from './components/zoom-controls';

export interface StyledMapProps {
  onPointChange?: (point: Location) => void;
  showZoomControls?: boolean;
  showNavigationControls?: boolean;
}

export const StyledMap = ({
  onPointChange,
  showZoomControls,
  showNavigationControls
}: StyledMapProps) => {
  const { available, tryGetLocation, getLocation } = useLocation();
  const [mapMoved, setMapMoved] = useState(true);

  const { darkMode } = useTheme();

  const mapRef = useRef<MapRef>(null);

  const [zoom, setZoom] = useState(12);
  const { enableVerticalSwipes, disableVerticalSwipes } = useWebApp();

  useEffect(() => {
    getLocation().then((location) => {
      if (location && mapRef.current) {
        mapRef.current.flyTo({
          center: [location.lon, location.lat],
          zoom: 16,
          duration: 1000
        });
      }
    });

    disableVerticalSwipes();

    return () => {
      enableVerticalSwipes();
    };
  }, []);

  const onZoom = (e: ViewStateChangeEvent) => {
    setZoom(e.viewState.zoom);
  };

  const onNavigationButtonClick = async () => {
    const location = await tryGetLocation();
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

  const onMove = (e: ViewStateChangeEvent) => {
    if (onPointChange) {
      const coords = {
        lat: e.viewState.latitude,
        lon: e.viewState.longitude
      };

      onPointChange(coords);
    }
  };

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

  return (
    <>
      <CustomMap
        initialViewState={{
          latitude: 59.945276,
          longitude: 30.312183,
          zoom: zoom
        }}
        onMove={onMove}
        onZoom={onZoom}
        ref={mapRef}
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
      </CustomMap>
      {showZoomControls && <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} />}
      {available && showNavigationControls && (
        <NavigationButton
          onClick={onNavigationButtonClick}
          active={!mapMoved}
        />
      )}
    </>
  );
};
