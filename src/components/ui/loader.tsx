import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="w-[50px] h-[50px] bg-black"
        animate={{
          scale: [1, 0.5, 0.5, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['5%', '5%', '50%', '50%', '5%'],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </div>
  );
};

export default Loader;
