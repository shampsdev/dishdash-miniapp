import Map, { MapProps, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAPBOX_TOKEN } from '@/shared/constants';
import { useEffect, useState } from 'react';

import DARK_MAP_STYLE from '@/assets/monochrome-dark.json';
import LIGHT_MAP_STYLE from '@/assets/monochrome-light.json';
import useTheme from '@/shared/hooks/useTheme';

export const CustomMap = (
  props: Omit<MapProps, 'projection' | 'logoPosition' | 'terrain'> &
    React.RefAttributes<MapRef>
) => {
  const { darkMode } = useTheme();
  const defaultMapStyle: any = darkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;

  const [mapStyle, setMapStyle] = useState(defaultMapStyle);

  useEffect(() => {
    const updatedMapStyle = darkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;
    setMapStyle(updatedMapStyle);
  }, [darkMode]);

  return (
    <Map
      mapStyle={mapStyle}
      attributionControl={false}
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={props.ref}
      {...props}
    >
      {props.children}
    </Map>
  );
};
