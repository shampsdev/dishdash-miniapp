import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo } from '@/lib/easings.data';

import { useLobbyStore } from '@/modules/swipes/stores/lobby.store';
import { SwipableCard } from '../../modules/swipes/components/swipable.card';
import { CardComponent } from '../../modules/swipes/components/card';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';

export type SwipeType = 'like' | 'dislike';

export const SwipesPage = () => {
  const { cards } = useLobbyStore();

  const {
    disableVerticalSwipes,
    enableVerticalSwipes,
    enableClosingConfirmation,
    disableClosingConfirmation
  } = useWebApp();

  useEffect(() => {
    disableVerticalSwipes();
    enableClosingConfirmation();

    return () => {
      enableVerticalSwipes();
      disableClosingConfirmation();
    };
  }, []);

  const cardVariants = {
    current: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: easeOutExpo }
    },
    upcoming: {
      opacity: 0.5,
      y: 67,
      scale: 0.9,
      transition: { duration: 0.3, ease: easeOutExpo }
    },
    remainings: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: easeOutExpo }
    }
  };

  return (
    <div className="flex min-h-full h-screen flex-col justify-center items-center overflow-hidden">
      <div className="flex flex-col gap-6 w-full xs:w-[420px] items-center justify-center relative z-10">
        <div className="w-full aspect-[21/30] max-w-[90vw] relative z-10">
          <AnimatePresence>
            {cards.map((card, i) => {
              const isLast = i === cards.length - 1;
              const isUpcoming = i === cards.length - 2;
              return (
                <motion.div
                  key={`card-${card.id}`}
                  className={`relative`}
                  variants={cardVariants}
                  initial="remainings"
                  animate={
                    isLast ? 'current' : isUpcoming ? 'upcoming' : 'remainings'
                  }
                  exit='exit'
                >
                  <SwipableCard id={card.id}>
                    <CardComponent data={{ card, time: '15min' }} />
                  </SwipableCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};