import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo } from '@/lib/easings.data';

import { useLobbyStore } from '@/modules/swipes/lobby/lobby.store';
import { SwipableCard } from '../../modules/swipes/swipes/swipable-card';
import { CardComponent } from '../../modules/swipes/swipes/card';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { Icons } from '@/assets/icons/icons';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import useTheme from '@/shared/hooks/useTheme';
import { useResultStore } from '@/modules/swipes/results/result.store';

export type SwipeType = 'like' | 'dislike';

export const SwipesPage = () => {
  const { background } = useTheme();
  const { cards } = useLobbyStore();
  const { setRoute } = useServerRouteStore();
  const { result } = useResultStore();

  const length = result?.top?.length ?? 0;

  const onResults = () => {
    setRoute('results');
  };

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

  // Define optional card variants
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

  const scaleVariants = {
    hidden: { scale: 0.75 },
    visible: {
      scale: 1,
      transition: { duration: 0.3, ease: easeOutExpo }
    }
  };

  return (
    <div className="flex min-h-full h-screen flex-col justify-center items-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={length}
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          onTap={onResults}
          className="cursor-pointer absolute top-[5vw] right-[5vw]"
        >
          <Icons.matches fill={background} className="text-primary" />
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-6 w-full xs:w-[420px] items-center justify-center relative z-10">
        <div className="w-full aspect-[21/30] max-w-[90vw] relative z-10">
          <AnimatePresence>
            {cards.map((card, i) => {
              const isLast = i === cards.length - 1;
              const isUpcoming = i === cards.length - 2;
              return (
                <motion.div
                  key={`card-${card.id}`}
                  className="relative"
                  variants={cardVariants}
                  initial="remainings"
                  animate={
                    isLast ? 'current' : isUpcoming ? 'upcoming' : 'remainings'
                  }
                  exit="exit"
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
