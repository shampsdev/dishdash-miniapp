import { motion, MotionValue } from 'framer-motion';
import HeartIcon from '@/assets/icons/heart.icon.tsx';
import CrossIcon from '@/assets/icons/cross.icon.tsx';

const CardDecision = ({
  leftOpacity,
  rightOpacity
}: {
  leftOpacity: MotionValue<number> | 0;
  rightOpacity: MotionValue<number> | 0;
}) => {
  return (
    <div className="absolute w-full top-1/3 flex justify-center h-14 -translate-y-1/3 z-20">
      <motion.div style={{ opacity: leftOpacity }} className="absolute">
        <HeartIcon className="bg-white rounded-full p-3" fill="fill-primary" />
      </motion.div>
      <motion.div style={{ opacity: rightOpacity }} className="absolute">
        <CrossIcon
          className="bg-primary rounded-full p-4"
          fill="fill-primary-foreground"
        />
      </motion.div>
    </div>
  );
};

export default CardDecision;