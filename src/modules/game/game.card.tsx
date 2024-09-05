import { Dispatch, SetStateAction } from 'react';

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';

import { themeColors } from '@/lib/theme';

import { InfoIcon } from '@/assets/icons/info.icon';

import { CardSwipeDirection, type Card } from '@/shared/types/game.type';
import { ButtonIcon } from '@/components/ui/button-icon';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import SwipeTag from './swipe-tags';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';

type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
};

const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  setIsDragOffBoundary,
}: Props) => {
  const { cards, setCards } = useLobbyStore();

  const x = useMotionValue(0);
  const isMobile = false;
  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = [
    themeColors.gameSwipe.left,
    themeColors.gameSwipe.neutral,
    themeColors.gameSwipe.right,
  ];

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenActionLeftScale = useTransform(
    x,
    inputX,
    outputActionScaleBadAnswer,
  );
  let drivenActionRightScale = useTransform(
    x,
    inputX,
    outputActionScaleRightAnswer,
  );

  let drivenBg = useTransform(x, [-20, 0, 20], outputMainBgColor);

  useMotionValueEvent(x, 'change', (latest) => {
    setCardDrivenProps((state: any) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  const sendDirection = (direction: CardSwipeDirection) => {
    if (direction === 'left') {
      swipesEvent.swipe('dislike');
    } else {
      swipesEvent.swipe('like');
    }
  };

  return (
    <div>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-transparent rounded-lg w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <div className="h-[360px] w-full xs:h-[420px] relative">
          <div className="bg-slate-100 h-full w-full rounded-t-3xl overflow-hidden">
            <img
              className="h-full w-auto min-w-full object-cover"
              src={data.image}
            />
          </div>
          <div className="absolute w-[90%] top-4 left-0 right-0 mx-auto flex justify-between items-center">
            <h3 className="py-2 px-4 rounded-3xl bg-white bg-opacity-80 backdrop-blur-sm">
              {data.title.split(', ')[0]}
            </h3>
            <ButtonIcon
              variant="outline"
              className="bg-white bg-opacity-80 backdrop-blur-sm h-10 w-10"
            >
              <InfoIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="-translate-y-12 pt-4 h-52 w-full rounded-3xl bg-white shadow-md overflow-hidden">
          <div className="mx-4 flex flex-wrap gap-2">
            {data?.tags.map((el, index) => (
              <SwipeTag key={`${el}-${index}`}>{el.name}</SwipeTag>
            ))}
          </div>
          <p className="p-4">{data?.description}</p>
        </div>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? 'hover:cursor-grab' : ''
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < offsetBoundary * -1) {
            setIsDragOffBoundary('left');
          } else if (offset > 0 && offset > offsetBoundary) {
            setIsDragOffBoundary('right');
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? 'right' : 'left';

          if (isOffBoundary) {
            const newCards = cards.filter((card) => card.id !== id);
            setCards(newCards);

            sendDirection(direction);
          }
        }}
        style={{ x }}
      ></motion.div>
    </div>
  );
};

export default GameCard;
