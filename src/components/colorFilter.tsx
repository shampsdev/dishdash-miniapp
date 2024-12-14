import { color, motion, MotionValue } from 'framer-motion';

const ColorFilter = ({
  opacity,
  colorStyle
}: {
  opacity: MotionValue<number> | 0;
  colorStyle?: string;
}) => {
  const colorFilterBaseStyles = 'pointer-events-none absolute inset-0 z-10';
  const className = colorFilterBaseStyles + ' ' + colorStyle;
  return (
    <motion.div style={{ opacity: opacity }} className={className}></motion.div>
  );
};

export default ColorFilter;
