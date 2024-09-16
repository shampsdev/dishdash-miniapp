import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo } from '@/lib/easings.data';

import { useLobbyStore } from '@/shared/stores/lobby.store';
import { Empty } from '@/components/ui/empty';
import SwipableCard from './swipable.card';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';

export type SwipeType = 'like' | 'dislike';

const GameCards = () => {
  const { cards } = useLobbyStore();

  const { disableVerticalSwipes, enableVerticalSwipes } = useWebApp();
  useEffect(() => {
    disableVerticalSwipes();

    return () => {
      enableVerticalSwipes();
    };
  }, []);

  const cardVariants = {
    current: {
      opacity: 1,
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
      x: 300,
      y: 40,
      rotate: 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <div className="flex min-h-full h-screen flex-col justify-center items-center overflow-hidden">
      <div
        id="gameUIWrapper"
        className="flex flex-col gap-6 w-full xs:w-[420px] items-center justify-center relative z-10"
      >
        <div
          id="cardsWrapper"
          className="w-full aspect-[100/170] max-w-[320px] xs:max-w-[420px] relative z-10"
        >
          {cards && cards.length > 0 ? (
            <AnimatePresence>
              {cards.map((card, i) => {
                const isLast = i === cards.length - 1;
                const isUpcoming = i === cards.length - 2;
                return (
                  <motion.div
                    key={`card-${i}`}
                    id={`card-${card.id}`}
                    className={`relative `}
                    variants={cardVariants}
                    initial="remainings"
                    animate={
                      isLast
                        ? 'current'
                        : isUpcoming
                          ? 'upcoming'
                          : 'remainings'
                    }
                    exit="exit"
                  >
                    <SwipableCard data={card} id={card.id} isLast={isLast} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCards;
