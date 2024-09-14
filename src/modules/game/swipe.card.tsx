import { Dispatch, SetStateAction } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { themeColors } from '@/lib/theme';
import { CardSwipeDirection, type Card } from '@/shared/types/game.type';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { CardComponent } from './card';

type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
};

const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
}: Props) => {
  const { cards, setCards } = useLobbyStore();

  const x = useMotionValue(0);
  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-10, 0, 10];
  let drivenX = useTransform(x, inputX, outputX);

  const outputRotate = [-15, 0, 15];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = [
    themeColors.gameSwipe.left,
    themeColors.gameSwipe.neutral,
    themeColors.gameSwipe.right,
  ];

  let drivenRotation = useTransform(drivenX, inputX, outputRotate);
  let drivenActionLeftScale = useTransform(
    drivenX,
    inputX,
    outputActionScaleBadAnswer,
  );
  let drivenActionRightScale = useTransform(
    drivenX,
    inputX,
    outputActionScaleRightAnswer,
  );

  let drivenBg = useTransform(drivenX, [-20, 0, 20], outputMainBgColor);

  useMotionValueEvent(drivenX, 'change', (latest) => {
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
    <motion.div
      id={`cardDrivenWrapper-${id}`}
      className={`absolute bg-transparent rounded-lg w-full aspect-[100/150] bg-black text-black origin-bottom shadow-card select-none ${
        !isDragging ? 'hover:cursor-grab' : ''
      }`}
      style={{
        x: drivenX,
        rotate: drivenRotation,
      }}
      drag="x"
      dragSnapToOrigin
      dragElastic={0.06}
      dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        const isOffBoundary =
          info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
        const direction = info.offset.x > 0 ? 'right' : 'left';

        if (isOffBoundary) {
          const newCards = cards.filter((card) => card.id !== id);
          setCards(newCards);

          sendDirection(direction);
        }
      }}
    >
      <CardComponent data={data} />
    </motion.div>
  );
};

export default GameCard;
