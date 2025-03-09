import Map, { MapProps, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAPBOX_TOKEN } from '@/shared/constants';
import React, { useEffect, useState } from 'react';

import DARK_MAP_STYLE from '@/assets/monochrome-dark.json';
import LIGHT_MAP_STYLE from '@/assets/monochrome-light.json';
import useTheme from '@/shared/hooks/useTheme';

type CustomMapProps = Omit<MapProps, 'projection' | 'logoPosition' | 'terrain'>;

export const CustomMap = React.forwardRef<MapRef, CustomMapProps>(
  (props, ref) => {
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
        ref={ref}
        {...props}
      >
        {props.children}
      </Map>
    );
  }
);

CustomMap.displayName = 'CustomMap';
