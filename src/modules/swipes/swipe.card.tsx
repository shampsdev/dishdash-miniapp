import { InfoIcon } from '@/assets/icons/info.icon';
import { ButtonIcon } from '@/components/ui/button-icon';
import volchek from '@/assets/volcheck.jpg';
import SwipeTag from './swipe.tag';
import { Dispatch, SetStateAction } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { Card } from '@/shared/types/game.type';

export type CardType = {
  title: string;
  image: React.ReactNode;
  tags: string[];
  description: string;
};

const categories = ['Кофе', 'Развлечения', 'Чай', 'Новые ощущения'];

type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
};

// type cardSwipeDirection = "left" | "right";

export const SwipeCard = (props: Props) => {
  // const cardAmount = 2;
  const x = useMotionValue(0);

  const offsetBoundary = 150;
  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];

  const outputMainBgColor = ['#fcbab6', '#fafafa', '#D4E0B2'];

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
    props.setCardDrivenProps((state: any) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  return (
    <>
      <motion.div
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <motion.div
          className={`${!props.isDragging ? 'hover:cursor-grab' : ''}`}
          drag="x"
          dragSnapToOrigin
          dragElastic={0.06}
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragTransition={{
            bounceStiffness: 1000,
            bounceDamping: 50,
          }}
          onDragStart={() => props.setIsDragging(true)}
          onDrag={(_, info) => {
            const offset = info.offset.x;

            if (offset < 0 && offset < offsetBoundary * -1) {
              props.setIsDragOffBoundary('left');
            } else if (offset > 0 && offset > offsetBoundary) {
              props.setIsDragOffBoundary('right');
            } else {
              props.setIsDragOffBoundary(null);
            }
          }}
          onDragEnd={(_) => {
            props.setIsDragging(false);
            props.setIsDragOffBoundary(null);
          }}
          style={{ x }}
        >
          <div className="h-[420px] w-[360px] relative">
            <img className="rounded-3xl" src={volchek} />
            <div className="absolute w-[90%] top-4 left-0 right-0 mx-auto flex justify-between items-center">
              <h3 className="py-2 px-4 rounded-3xl bg-white bg-opacity-80 backdrop-blur-sm">
                {props.data.title}
              </h3>
              <ButtonIcon
                variant="outline"
                className="bg-white bg-opacity-80 backdrop-blur-sm h-10 w-10"
              >
                <InfoIcon />
              </ButtonIcon>
            </div>
          </div>
          <div className="-translate-y-12 pt-4 h-52 w-[360px] rounded-3xl bg-white shadow-md">
            <div className="mx-4 flex flex-wrap gap-2">
              {categories.map((el, index) => (
                <SwipeTag key={index}>{el}</SwipeTag>
              ))}
            </div>
            <p className="p-4">{props.data.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
