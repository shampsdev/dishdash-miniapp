import { Dispatch, SetStateAction } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CardSwipeDirection, Card } from '@/shared/types/card.interface';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { CardComponent } from './card';

type Props = {
  id?: number;
  data: Card;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
};

const GameCard = ({ id, data, setIsDragging, isDragging }: Props) => {
  const { cards, setCards } = useLobbyStore();

  const x = useMotionValue(0);
  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-10, 0, 10];
  let drivenX = useTransform(x, inputX, outputX);

  const outputRotate = [-15, 0, 15];
  let drivenRotation = useTransform(drivenX, inputX, outputRotate);

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
      className={`absolute bg-transparent rounded-lg w-full aspect-[100/150] text-primary origin-bottom shadow-card select-none ${
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
