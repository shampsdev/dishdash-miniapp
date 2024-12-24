import React, { useState, useEffect } from 'react';
import SnowflakeLightSmall from './snowflakeLightSmall.png';
import SnowflakeLightLarge from './snowflakeLightLarge.png';
import SnowflakeGraySmall from './snowflakeGraySmall.png';
import SnowflakeGrayLarge from './snowflakeGrayLarge.png';
import useTheme from '@/shared/hooks/useTheme';

interface SnowflakeProps {
  id: number;
  isLargeSnowflake: boolean;
}

const Snowflake: React.FC<SnowflakeProps> = ({ id, isLargeSnowflake }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const theme = useTheme();
  let snowflakeImage: string;

  if (theme.darkMode && isLargeSnowflake) {
    snowflakeImage = SnowflakeLightLarge;
  } else if (theme.darkMode && !isLargeSnowflake) {
    snowflakeImage = SnowflakeLightSmall;
  } else if (!theme.darkMode && !isLargeSnowflake) {
    snowflakeImage = SnowflakeGraySmall;
  } else {
    snowflakeImage = SnowflakeGrayLarge;
  }
  const generateSnowflake = () => {
    const leftPosition = `${Math.random() * 90}%`;
    const fontSize = `${Math.floor(Math.random() * 10) + 10}px`;
    const animationDuration = `${Math.random() * 8 + 10}s`;
    const rotation = `${Math.random() * 360}deg`;
    const animationDelay = `${(Math.random() * 15).toFixed(2)}s`;

    setStyle({
      left: leftPosition,
      fontSize,
      transform: `rotate(${rotation})`,
      animation: `fall ${animationDuration} linear infinite ${animationDelay}`
    });
  };

  useEffect(() => {
    generateSnowflake();
  }, []);

  return (
    <p
      className="inline-block w-[0.1%] opacity-0 m-0 p-0"
      id={`item${id}`}
      style={{
        ...style,
        position: 'absolute',
        top: '-10px',
        color: 'white',
        userSelect: 'none',
        width: isLargeSnowflake ? '13px' : '8px',
        zIndex: 0
      }}
    >
      <img src={snowflakeImage} alt="*" />
    </p>
  );
};

const Snow: React.FC = () => {
  const [numFlakes] = useState<number>(30);
  const snowflakes = Array.from({ length: numFlakes }, (_, i) => (
    <Snowflake key={i} id={i} isLargeSnowflake={i < numFlakes / 2} />
  ));

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
      {snowflakes}
    </div>
  );
};

export default Snow;
