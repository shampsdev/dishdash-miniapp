import { SwipeCard } from './swipe.card'
import XMarkIcon from '@/assets/icons/x-mark.icon'
import HeartIcon from '@/assets/icons/heart.icon'
import { ButtonIcon } from '@/components/ui/button-icon';
import { easeOutExpo } from "@/lib/easings.data";
import { CardSwipeDirection, IsDragOffBoundary } from '@/types/card-swipe-direction.type';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

const initialDrivenProps = {
  cardWrapperX: 0,
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: "black"
}

const cards = [
  {
    title: "Булочная Ф. Вольчека",
    image: "./",
    tags: ["Кафе", "Кофейня", "Пекарня", "Кондитерская"],
    description: "Место, где можно насладиться свежей выпечкой и пирогами с различными начинками."
  },
  {
    title: "Булочная Ф. Вольчека",
    image: "./",
    tags: ["Кафе", "Кофейня", "Пекарня", "Кондитерская"],
    description: "Место, где можно насладиться свежей выпечкой и пирогами с различными начинками."
  },
  {
    title: "Булочная Ф. Вольчека",
    image: "./",
    tags: ["Кафе", "Кофейня", "Пекарня", "Кондитерская"],
    description: "Место, где можно насладиться свежей выпечкой и пирогами с различными начинками."
  }
]

export const SwipeSection = () => {
  const [direction, setDirection] = useState<CardSwipeDirection | "">("");
  const [isDragOffBoundary, setIsDragOffBoundary] = useState<IsDragOffBoundary>(null);
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState(false);


  const handleActionBtnOnClick = (btn: CardSwipeDirection) => {
    setDirection(btn);
    console.log(isDragOffBoundary);
    console.log(cardDrivenProps);
  }

  useEffect(() => {
    if (["left", "right"].includes(direction)) {
      
    }

    setDirection("")
  }, [direction]);

  const cardVariants = {
    current: {
      oppacity: 1,
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
      x: direction === "left" ? -300 : 300,
      y: 40,
      rotate: direction === "left" ? -20 : 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  }
  return (
    <div className='grid h-screen place-items-center'>
      <div>
        <AnimatePresence>
          { cards.map((el, index) => { 
            const isLast = index === cards.length - 1;
            const isUpcoming = index === cards.length - 2;

            return(
              <motion.div
                key={index}
                className='relative'
                variants={cardVariants}
                initial="remainings"
                animate={
                  isLast ? "current" : isUpcoming ? "upcoming" : "remainings"
                }
                exit="exit"
              >
                <SwipeCard 
                  data={el}
                  setCardDrivenProps={setCardDrivenProps}
                  setIsDragging={setIsDragging}
                  isDragging={isDragging}
                  isLast={isLast}
                  setIsDragOffBoundary={setIsDragOffBoundary}
                />
              </motion.div>
            ) 
          })}
        </AnimatePresence>
        <div className='flex justify-center gap-x-12'>
            <ButtonIcon
              onClick={() => handleActionBtnOnClick("left")}
              variant="secondary"
            >
              <HeartIcon/>
            </ButtonIcon>

            <ButtonIcon
              onClick={() => handleActionBtnOnClick("right")}
            >
              <XMarkIcon/>
            </ButtonIcon>
          </div>
        </div>
    </div>
  )
}