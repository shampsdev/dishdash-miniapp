import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import Loader from '@/components/ui/loader';
import { useLoadingStore } from '@/shared/stores/loading.store';
import { Outlet } from 'react-router-dom';

const gameScreenVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
  },
};

const loaderVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
  },
};

export const GameComponent = () => {
  const { isLoading } = useLoadingStore();

  return (
    <main className="h-screen mx-auto bg-background">
      <Toaster
        toastOptions={{
          className: 'bg-secondary text-foreground rounded-full w-full',
        }}
      />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            variants={loaderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="gameScreen"
            id="gameScreen"
            variants={gameScreenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
