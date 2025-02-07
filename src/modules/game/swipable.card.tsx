import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  PanInfo
} from 'framer-motion';
import { CardSwipeDirection, Card } from '@/shared/types/card.interface';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';

type Props = {
  id: number;
  children: React.ReactNode;
};

// todo
// - for some reason the cards don't swipe on android right now

export const SwipableCard = ({ id, children }: Props): JSX.Element => {
  const { cards, setCards } = useLobbyStore();

  const x = useMotionValue(0);
  const offsetBoundary = 120;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputRotate = [-15, 0, 15];

  let drivenRotation = useTransform(x, inputX, outputRotate);

  const sendDirection = (direction: CardSwipeDirection) => {
    if (direction === 'left') {
      swipesEvent.swipe(id, 'dislike');
    } else {
      swipesEvent.swipe(id, 'like');
    }
  };

  const handlePanEnd = (info: any) => {
    const isOffBoundary =
      info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
    const direction = info.offset.x > 0 ? 'right' : 'left';

    if (isOffBoundary) {
      const newCards = cards.filter((card) => card.id !== id);
      setCards(newCards);
      sendDirection(direction);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 1000, damping: 30 });
    }
  };

  const onPan = (info: PanInfo) => {
    if (
      Math.abs(info.delta.x) > Math.abs(info.delta.y) ||
      Math.abs(info.offset.x) > 20
    )
      x.set(info.offset.x);
  };

  return (
    <motion.div
      id={`cardDrivenWrapper-${id}`}
      className={`touch-none absolute bg-transparent rounded-lg w-full aspect-[21/30] text-primary origin-bottom shadow-card select-none active:cursor-grab`}
      style={{
        x,
        rotate: drivenRotation
      }}
      onPan={(_, info) => onPan(info)}
      onPanEnd={(_, info) => handlePanEnd(info)}
    >
      {children}
    </motion.div>
  );
};
