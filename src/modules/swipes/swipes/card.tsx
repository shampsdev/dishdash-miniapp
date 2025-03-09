import { useState } from 'react';
import { motion, MotionValue, PanInfo, useTransform } from 'framer-motion';
import { useShowPopup, useWebApp } from '@vkruglikov/react-telegram-web-app';

import ColorFilter from '@/modules/swipes/swipes/color-filter';
import CardDecision from '@/modules/swipes/swipes/card-decision';
import { Icons } from '@/assets/icons/icons';
import { Card } from '../interfaces/card.interface';

export interface CardComponentProps {
  data: {
    card: Card;
    time: string;
  };
  deltaY?: MotionValue;
  last?: boolean;
}

export const CardComponent = ({ data, deltaY, last }: CardComponentProps) => {
  const [expanded, setExpanded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const showPopup = useShowPopup();

  const { openLink } = useWebApp();

  const onPartnerClick = () => {
    showPopup({
      title: `${data.card.title} — заведение парнтер.`,
      message: 'DishDash партнерствует с кем попало))',
      buttons: [
        {
          text: 'Понятно!'
        }
      ]
    });
  };

  const leftOpacity = deltaY
    ? useTransform(deltaY, [-5, 0, 5], [0, 0, 0.3])
    : 0;

  const rightOpacity = deltaY
    ? useTransform(deltaY, [-5, 0, 5], [0.7, 0, 0])
    : 0;

  const iconRightOpacity = deltaY
    ? useTransform(deltaY, [-5, 0, 5], [1, 0, 0])
    : 0;
  const iconLeftOpacity = deltaY
    ? useTransform(deltaY, [-5, 0, 5], [0, 0, 1])
    : 0;

  const cardImageOnTapHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const { left, width } = target.getBoundingClientRect();
    const tapX = e.clientX - left;

    const isLeftTap = tapX + width / 4 < width / 2;
    const isRightTap = tapX - width / 4 > width / 2;

    setImageIndex((prevIndex) => {
      if (isLeftTap) {
        return (
          (prevIndex - 1 + data.card.images.length) % data.card.images.length
        );
      }
      if (isRightTap) {
        return (prevIndex + 1) % data.card.images.length;
      }
      return prevIndex;
    });
  };

  const followPlaceURL = () => {
    const url =
      data.card.url !== null && data.card.url !== ''
        ? data.card.url
        : `https://yandex.ru/maps/?rtext=${data.card.location.lat}%2C${data.card.location.lon}`;
    openLink(url);
  };

  const handleDrag = (_: any, info: PanInfo) => {
    if (
      Math.abs(info.delta.y) > Math.abs(info.delta.x) &&
      Math.abs(info.offset.y) < 50
    ) {
      if (info.delta.y < 0 && Math.abs(info.offset.x) < 20) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    }
  };

  return (
    <div className="relative h-full overflow-hidden rounded-3xl">
      <ColorFilter opacity={rightOpacity} colorStyle="bg-secondary" />
      <ColorFilter opacity={leftOpacity} colorStyle="bg-primary" />
      <div className="w-full aspect-square">
        <div className="bg-slate-100 h-full w-full rounded-t-3xl pb-4 overflow-hidden">
          <img
            draggable="false"
            className="h-full w-auto min-w-full object-cover"
            src={data.card.images[imageIndex]}
          />
        </div>
      </div>

      {/*  images scrollbar */}
      <div className="w-full absolute opacity-50 px-5 gap-4 flex p-2 top-0 justify-between">
        {data.card.images.length > 1 &&
          data.card.images.map((_, index) => {
            return (
              <div
                key={`image_${index}`}
                className={`${index == imageIndex ? 'bg-muted' : 'bg-muted-foreground'} h-[2px] w-full rounded-full`}
              />
            );
          })}
      </div>

      {/*  display like/dislike */}
      {deltaY && (
        <CardDecision
          rightOpacity={iconRightOpacity}
          leftOpacity={iconLeftOpacity}
        />
      )}

      <motion.div
        onTap={cardImageOnTapHandler}
        className="absolute top-0 w-full h-full"
      >
        <motion.div
          className="absolute pt-4 bottom-0 w-full rounded-3xl bg-secondary shadow-md overflow-hidden"
          initial={{ height: '43%' }}
          animate={{ height: expanded ? '80%' : '43%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0}
          onDrag={handleDrag}
        >
          <div className="h-1 bg-muted-foreground mb-1 rounded-full mx-auto w-14"></div>
          <div className="flex justify-between items-center">
            <h1 className="text-foreground text-lg font-medium mx-4">
              {data.card.title}
            </h1>

            {data.card.boost !== null && (
              <div
                className="mx-4 p-3 aspect-square h-full rounded-full bg-secondary-foreground"
                onClick={onPartnerClick}
              >
                <Icons.award className="-translate-y-[3px]" />
              </div>
            )}
          </div>
          <p className="px-4 text-muted-foreground">
            {data.card.tags.map((el) => el.name).join(', ')}
          </p>
          <div className="w-full grid grid-cols-2 gap-4 px-4 pt-3">
            <div className="bg-secondary-foreground font-medium text-center py-1 rounded-xl">
              ~ {data.card.priceAvg} ₽
            </div>
            <div className="flex bg-secondary-foreground font-medium gap-1 justify-center items-center py-1 rounded-xl">
              <Icons.walk className="animate-highlight h-[1.2rem] w-[0.9rem] text-primary" />{' '}
              {data.time}
            </div>
          </div>
          <div className="h-full">
            {last && (
              <div className="p-4 flex flex-col justify-between overflow-hidden text-foreground">
                <div className={expanded ? 'line-clamp-[9]' : 'line-clamp-3'}>
                  {data.card.description}
                </div>
                {expanded && (
                  <div onClick={followPlaceURL} className="underline pt-2">
                    {data.card.address}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
