import { useMatchStore } from '@/modules/swipes/match/match.store';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import { easeOutExpo } from '@/lib/easings.data';
import {
  mainButton,
  openLink,
  secondaryButton
} from '@telegram-apps/sdk-react';

const variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easeOutExpo
    }
  }
};

export const MatchCard = () => {
  const { card } = useMatchStore();
  const { setRoute } = useServerRouteStore();

  const onResults = () => {
    setRoute('results');
  };

  const onContinue = () => {
    setRoute('swiping');
  };

  useEffect(() => {
    mainButton.setParams({
      text: 'Дальше',
      isVisible: true,
      isEnabled: true
    });
    mainButton.onClick(onContinue);

    secondaryButton.setParams({
      text: 'Мэтчи',
      isVisible: true,
      isEnabled: true
    });
    secondaryButton.onClick(onResults);

    return () => {
      mainButton.setParams({
        isVisible: false
      });
      mainButton.offClick(onContinue);

      secondaryButton.setParams({
        isVisible: false
      });
      secondaryButton.offClick(onResults);
    };
  }, []);

  const [imageIndex, setImageIndex] = useState(0);

  const onAddressClick = () => {
    const url = card?.url === null || card?.url === '' ? null : card?.url;

    openLink(
      url ||
        `https://yandex.ru/maps/?rtext=${card?.location.lat}%2C${card?.location.lon}`
    );
  };

  const onImageTap = (e: MouseEvent) => {
    const boundingBox = (e.target as HTMLElement).getBoundingClientRect();
    const tapX = e.clientX - boundingBox.left;
    const elementWidth = boundingBox.width;

    if (card == null) return;

    setImageIndex((prevIndex) => {
      if (tapX + elementWidth / 4 < elementWidth / 2) {
        return (prevIndex - 1 + card.images.length) % card.images.length;
      } else if (tapX - elementWidth / 4 > elementWidth / 2) {
        return (prevIndex + 1) % card.images.length;
      }
      return prevIndex;
    });
  };

  return (
    <div
      className="flex h-screen pb-6 flex-col justify-center items-center overflow-hidden  ${
      isDragging"
    >
      <div className="text-2xl py-5 font-medium">100% мэтч!</div>
      <motion.div
        initial={'hidden'}
        animate={'visible'}
        variants={variants}
        id="cardsWrapper"
        className="w-full aspect-[30/35] max-w-[90vw] relative z-10"
      >
        <div className="w-full z-50 absolute opacity-50 px-5 gap-4 flex p-2 top-0 justify-between">
          {card !== null &&
            card !== undefined &&
            card.images.length > 1 &&
            card?.images.map((_, index) => {
              return (
                <div
                  key={`image_${index}`}
                  className={`${index == imageIndex ? 'bg-muted' : 'bg-muted-foreground'} h-[2px] w-full rounded-full`}
                />
              );
            })}
        </div>
        <motion.div
          onTap={onImageTap}
          className="h-full rounded-3xl overflow-hidden"
        >
          <div className="h-[380px] w-full">
            <div className="bg-slate-100 h-full w-full rounded-3xl pb-4 overflow-hidden">
              <img
                draggable="false"
                className="h-full w-auto min-w-full object-cover"
                src={card?.images[imageIndex]}
              />
            </div>
          </div>
          <div className="absolute top-0 w-full h-full">
            <div className="absolute pt-4 bottom-0 w-full rounded-3xl bg-secondary shadow-md overflow-hidden">
              <h1 className="text-foreground text-lg font-medium mx-4">
                {card?.title}
              </h1>
              <div className="h-full">
                <p
                  onClick={onAddressClick}
                  className="p-4 pt-0 cursor-pointer underline flex flex-col justify-between overflow-hidden text-foreground"
                >
                  {card?.address}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
