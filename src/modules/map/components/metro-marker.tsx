import { Station } from '@/modules/map/station.interface';
import { Marker } from 'react-map-gl';
import { Icons } from '@/assets/icons/icons';
import { CSSProperties } from 'react';

interface MetroMarkerProps {
  station: Station;
  darkMode: boolean;
  textVisible: boolean;
  fill: string;
  style: CSSProperties;
}

export const MetroMarker = ({
  station,
  darkMode,
  textVisible,
  fill,
  style
}: MetroMarkerProps) => (
  <Marker
    longitude={station.coords.lon}
    latitude={station.coords.lat}
    anchor="center"
    pitchAlignment="auto"
    rotationAlignment="auto"
  >
    <div
      style={style}
      className="w-fit items-center flex flex-col"
    >
      <Icons.metro className="h-8 w-8" fill={fill} />
      {textVisible && (
        <p
          className={`text-center w-fit ${darkMode ? 'text-muted' : 'text-muted-foreground'}`}
        >
          {station.name}
        </p>
      )}
    </div>
  </Marker>
);
