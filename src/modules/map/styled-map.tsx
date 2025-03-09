import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CustomMap } from './components/custom-map';
import { MetroMarker } from './components/metro-marker';
import { Station } from './station.interface';

import stations from '@/assets/stations.json';
import lines from '@/assets/lines.json';

import { useLocation } from '@/shared/hooks/useLocation';
import { MapRef, ViewStateChangeEvent } from 'react-map-gl';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Location } from '../../shared/interfaces/location.interface';
import useTheme from '@/shared/hooks/useTheme';
import { NavigationButton } from './components/navigation-button';
import { ZoomControls } from './components/zoom-controls';
import React from 'react';

export interface StyledMapProps {
  onPointChange?: (point: Location) => void;
  showZoomControls?: boolean;
  showNavigationControls?: boolean;
}

export const StyledMap = React.forwardRef<MapRef, StyledMapProps>(
  (props, ref) => {
    const { onPointChange, showZoomControls, showNavigationControls } = props;
    const mapRef = useRef<MapRef>(null);
    useImperativeHandle(ref, () => mapRef.current as MapRef);

    const { tryGetLocation, getLocation } = useLocation();
    const [mapMoved, setMapMoved] = useState(true);
    const [flyInProgress, setFlyInProgress] = useState(false);

    const { darkMode } = useTheme();
    const [zoom, setZoom] = useState(12);
    const { enableVerticalSwipes, disableVerticalSwipes } = useWebApp();

    const getCentered = async () => {
      const userLocation = await getLocation();
      if (mapRef.current && userLocation) {
        const mapCenter = mapRef.current.getCenter();
        return (
          Math.abs(mapCenter.lat - userLocation.lat) < 0.00001 &&
          Math.abs(mapCenter.lng - userLocation.lon) < 0.00001
        );
      }
      return false;
    };

    useEffect(() => {
      setTimeout(async () => {
        const location = await tryGetLocation();

        if (location && mapRef.current) {
          console.log('Got location on load:', location);
          setFlyInProgress(true);
          setMapMoved(false);
          mapRef.current.flyTo({
            center: [location.lon, location.lat],
            zoom: 16,
            duration: 1000
          });
        }
      }, 100);

      disableVerticalSwipes();
      return () => {
        enableVerticalSwipes();
      };
    }, []);

    const onMoveStart = (evt: ViewStateChangeEvent) => {
      if (evt.originalEvent) {
        if (!mapMoved || flyInProgress) {
          setFlyInProgress(false);
          setMapMoved(true);
        }
      }
    };

    const onMoveEnd = async () => {
      setFlyInProgress(false);
      const centered = await getCentered();
      setMapMoved(!centered);
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

    const onZoom = (e: ViewStateChangeEvent) => {
      setZoom(e.viewState.zoom);
    };

    const onNavigationButtonClick = async () => {
      const location = await tryGetLocation();
      if (location && mapRef.current) {
        setFlyInProgress(true);
        setMapMoved(false);
        mapRef.current.flyTo({
          center: [location.lon, location.lat],
          zoom: 16,
          duration: 1000
        });
      } else {
        console.error('Map reference or location is unavailable');
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
          onMoveStart={onMoveStart}
          onMoveEnd={onMoveEnd}
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
                // @ts-expect-error raw json lines
                fill={lines[station.line]}
              />
            ))}
        </CustomMap>

        {showZoomControls && <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} />}

        {showNavigationControls && (
          <NavigationButton
            onClick={onNavigationButtonClick}
            active={!mapMoved}
          />
        )}
      </>
    );
  }
);

StyledMap.displayName = 'StyledMap';
