import { motion } from "framer-motion";
import SvgIconAnswerBad from "@/assets/icons/heart.icon";
import SvgIconAnswerGood from "@/assets/icons/x-mark.icon";

import { IsDragOffBoundary } from "@/shared/types/game.type";
import HeartIcon from "@/assets/icons/heart.icon";
import XMarkIcon from "@/assets/icons/x-mark.icon";

const actionPropsMatrix = {
  left: {
    ariaLabel: "Swipe Left",
    bgColorClass: "bg-answerBad-500",
    icon: SvgIconAnswerBad,
    iconBaseColorClass: "text-[#701823]",
  },
  right: {
    ariaLabel: "Swipe Right",
    bgColorClass: "bg-answerGood-500",
    icon: SvgIconAnswerGood,
    iconBaseColorClass: "text-[#2C5B10]",
  },
};

type Props = {
  ariaLabel: string;
  scale: number;
  type: "like" | "dislike";
  direction: "left" | "right";
  isDragOffBoundary: IsDragOffBoundary;
  onClick: () => void;
};

const GameActionBtn = ({
  scale,
  direction,
  type,
  isDragOffBoundary = null,
  onClick,
}: Props) => {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.9 }}>
      <motion.div
        className={`flex items-center justify-center w-[60px] h-[60px] rounded-full ${actionPropsMatrix[direction].bgColorClass} shadow`}
        style={{ scale: scale }}
      >
        { 
        type === "like" 
        ?         
        <HeartIcon
          className={`w-[24px] h-[24px] duration-100 ease-out ${
            isDragOffBoundary != null && isDragOffBoundary === direction
              ? "text-white"
              : actionPropsMatrix[direction!].iconBaseColorClass
          }`}
        />
        :
        <XMarkIcon
          className={`w-[24px] h-[24px] duration-100 ease-out ${
            isDragOffBoundary != null && isDragOffBoundary === direction
              ? "text-white"
              : actionPropsMatrix[direction!].iconBaseColorClass
          }`}
        />
      }

      </motion.div>
    </motion.button>
  );
};

export default GameActionBtn;
