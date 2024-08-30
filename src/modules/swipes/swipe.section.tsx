import XMarkIcon from '@/assets/icons/x-mark.icon';
import HeartIcon from '@/assets/icons/heart.icon';
import { ButtonIcon } from '@/components/ui/button-icon';
import { easeOutExpo } from '@/lib/easings.data';
import {
  CardSwipeDirection,
  IsDragOffBoundary,
} from '@/shared/types/card-swipe-direction.type';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLobbyStore } from '@/store/lobby.store';
import { SwipeCard } from './swipe.card';

const initialDrivenProps = {
  cardWrapperX: 0,
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: 'black',
};

export const SwipeSection = () => {
  const [direction, setDirection] = useState<CardSwipeDirection | ''>('');
  const [, setIsDragOffBoundary] =
    useState<IsDragOffBoundary>(null);
  const [, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState(false);
  const { cards } = useLobbyStore();

  const handleActionBtnOnClick = (btn: CardSwipeDirection) => {
    setDirection(btn);
  };

  const cardVariants = {
    current: {
      oppacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
    upcoming: {
      opacity: 0.5,
      y: 67,
      scale: 0.9,
      transition: { duration: 0.3, ease: easeOutExpo, delay: 0 },
    },
    remainings: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    exit: {
      opacity: 0,
      x: direction === 'left' ? -300 : 300,
      y: 40,
      rotate: direction === 'left' ? -20 : 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <AnimatePresence>
          {cards.map((el, index) => {
            const isLast = index === cards.length - 1;
            const isUpcoming = index === cards.length - 2;

            return (
              <motion.div
                key={index}
                className="relative"
                variants={cardVariants}
                initial="remainings"
                animate={
                  isLast ? 'current' : isUpcoming ? 'upcoming' : 'remainings'
                }
                exit="exit"
              >
                <SwipeCard
                  data={el}
                  setCardDrivenProps={setCardDrivenProps}
                  setIsDragging={setIsDragging}
                  isDragging={isDragging}
                  isLast={isLast}
                  setIsDragOffBoundary={setIsDragOffBoundary}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div className="flex justify-center gap-x-12">
          <ButtonIcon
            onClick={() => handleActionBtnOnClick('left')}
            variant="secondary"
          >
            <HeartIcon />
          </ButtonIcon>

          <ButtonIcon onClick={() => handleActionBtnOnClick('right')}>
            <XMarkIcon />
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
};
