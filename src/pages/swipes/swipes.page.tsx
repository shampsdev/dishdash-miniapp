import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo } from '@/lib/easings.data';

import { useLobbyStore } from '@/modules/swipes/lobby/lobby.store';
import { SwipableCard } from '../../modules/swipes/swipes/swipable-card';
import { CardComponent } from '../../modules/swipes/swipes/card';
import { useEffect } from 'react';
import { Icons } from '@/assets/icons/icons';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import { useTheme } from '@/shared/hooks/useTheme';
import { useResultStore } from '@/modules/swipes/results/result.store';
import { getTime } from '@/shared/util/time.util';
import { useSettingsStore } from '@/modules/swipes/settings/settings.store';
import {
  isClassicPlaces,
  isCollectionPlaces
} from '@/modules/swipes/interfaces/settings/settings.interface';
import { Error } from '@/components/ui/error';

import { swipeBehavior, closingBehavior } from '@telegram-apps/sdk-react';

export type SwipeType = 'like' | 'dislike';

export const SwipesPage = () => {
  const { background } = useTheme();
  const { cards } = useLobbyStore();
  const { settings } = useSettingsStore();
  const { setRoute } = useServerRouteStore();
  const { result } = useResultStore();

  const length = result?.top?.length ?? 0;

  const onResults = () => {
    setRoute('results');
  };

  useEffect(() => {
    swipeBehavior.disableVertical();
    closingBehavior.enableConfirmation();
    return () => {
      swipeBehavior.enableVertical();
      closingBehavior.disableConfirmation();
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
      y: 60,
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
    <div className="min-h-screen h-full p-5">
      <div className="flex justify-between items-center pb-8">
        <AnimatePresence mode="popLayout">
          <div className="flex text-xl font-medium">
            {cards.length > 0 ? (
              <>
                Места в
                <motion.div
                  key={
                    isClassicPlaces(settings) && cards.length > 0
                      ? getTime(
                          settings.classicPlaces.location,
                          cards[0].location
                        )
                      : isCollectionPlaces(settings)
                        ? getTime(
                            settings.collectionPlaces.location,
                            cards[0].location
                          )
                        : '0'
                  }
                  variants={scaleVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-1 font-semibold"
                >
                  {isClassicPlaces(settings) && cards.length > 0
                    ? getTime(
                        settings.classicPlaces.location,
                        cards[cards.length - 1].location
                      )
                    : isCollectionPlaces(settings)
                      ? getTime(
                          settings.collectionPlaces.location,
                          cards[cards.length - 1].location
                        )
                      : '0'}
                </motion.div>
              </>
            ) : (
              <>Уже {result?.top.length} мэтчей</>
            )}
          </div>
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={length}
            onTap={onResults}
            className={`${length === 1 && 'animate-scale'} relative cursor-pointer transition-transform active:scale-75 active:opacity-75`}
          >
            <Icons.matches
              fill={background}
              className={`${length === 1 && 'animate-pulse'} text-primary`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-col justify-center items-center overflow-visible">
        <div className="flex flex-col gap-6 w-full xs:w-[420px] items-center justify-center relative z-10">
          <div className="w-full aspect-[21/30] max-w-[90vw] relative z-10">
            <AnimatePresence>
              {cards.length > 0 ? (
                cards.map((card, i) => {
                  const isLast = i === cards.length - 1;
                  const isUpcoming = i === cards.length - 2;
                  return (
                    <motion.div
                      key={`card-${card.id}`}
                      className="relative"
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
                      <SwipableCard id={card.id}>
                        <CardComponent
                          last={isLast}
                          data={{
                            card,
                            time: isClassicPlaces(settings)
                              ? getTime(
                                  settings.classicPlaces.location,
                                  card.location
                                )
                              : isCollectionPlaces(settings)
                                ? getTime(
                                    settings.collectionPlaces.location,
                                    card.location
                                  )
                                : '0'
                          }}
                        />
                      </SwipableCard>
                    </motion.div>
                  );
                })
              ) : (
                <Error className="pb-20" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
