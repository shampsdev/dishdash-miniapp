import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CardSwipeDirection, Card } from '@/shared/types/card.interface';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { CardComponent } from './card';

type Props = {
  id?: number;
  data: Card;
  isLast: boolean;
};

const SwipableCard = ({ id, data }: Props) => {
  const { cards, setCards } = useLobbyStore();

  const x = useMotionValue(0);
  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputRotate = [-15, 0, 15];

  let drivenRotation = useTransform(x, inputX, outputRotate);

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
      className={`absolute bg-transparent rounded-lg w-full aspect-[100/150] text-primary origin-bottom shadow-card select-none active:cursor-grab`}
      style={{
        x,
        rotate: drivenRotation,
      }}
      drag="x"
      dragSnapToOrigin
      dragElastic={0.06}
      dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
      onDragEnd={(_, info) => {
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

export default SwipableCard;
