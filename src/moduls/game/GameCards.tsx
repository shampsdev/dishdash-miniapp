import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { BgPattern } from "@/components/ui/bg-pattern";
import { themeColors } from "@/lib/theme";

import { useGameContext } from "@/store/gameContext";

import { easeOutExpo } from "@/lib/easings.data";
import GameActionBtn from "./GameActionBtn";
import GameCard from "./GameCard";

import { CardSwipeDirection, IsDragOffBoundary } from "@/types/game.type";

const initialDrivenProps = {
  cardWrapperX: 0,
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: themeColors.gameSwipe.neutral,
};

const GameCards = () => {
  const [game, setGame] = useGameContext();

  const { cards } = game;

  const [direction, setDirection] = useState<CardSwipeDirection | "">("");
  const [isDragOffBoundary, setIsDragOffBoundary] =
    useState<IsDragOffBoundary>(null);
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState(false);

  const handleActionBtnOnClick = (btn: CardSwipeDirection) => {
    setDirection(btn);

    // if (btn === "left") {
    //   socket.emit("echo", "left");
    // } else {
    //   socket.emit("echo", "right");
    // }
  };

  useEffect(() => {
    console.log("connected... (xuy)")

    // socket.on("echo", (data: string) => {
    //   console.log(data);
    // })

    if (["left", "right"].includes(direction)) {
      setGame({
        ...game,
        cards: game.cards.slice(0, -1),
      });
    }

    setDirection("");

    // return () => {
    //   socket.off("echo")
    // }
  }, [direction]);

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
      x: direction === "left" ? -300 : 300,
      y: 40,
      rotate: direction === "left" ? -20 : 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <motion.div
      className={`flex mx-1 min-h-screen h-full flex-col justify-center items-center overflow-hidden  ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{ backgroundColor: cardDrivenProps.mainBgColor }}
    >
      <BgPattern />
      <div
        id="gameUIWrapper"
        className="flex flex-col gap-6 w-full xs:w-[420px] items-center justify-center relative z-10"
      >
        <div
          id="cardsWrapper"
          className="w-full aspect-[100/170] max-w-[320px] xs:max-w-[420px] relative z-10"
        >
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
                    isLast ? "current" : isUpcoming ? "upcoming" : "remainings"
                  }
                  exit="exit"
                >
                  <GameCard
                    data={card}
                    id={card.id}
                    setCardDrivenProps={setCardDrivenProps}
                    setIsDragging={setIsDragging}
                    isDragging={isDragging}
                    isLast={isLast}
                    setIsDragOffBoundary={setIsDragOffBoundary}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div
          id="actions"
          className="flex items-center justify-center w-full  gap-4 relative z-10"
        >
          <GameActionBtn
            direction="left"
            ariaLabel="swipe left"
            type="dislike"
            scale={cardDrivenProps.buttonScaleBadAnswer}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick("left")}
          />
          <GameActionBtn
            direction="right"
            ariaLabel="swipe right"
            type="like"
            scale={cardDrivenProps.buttonScaleGoodAnswer}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick("right")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GameCards;