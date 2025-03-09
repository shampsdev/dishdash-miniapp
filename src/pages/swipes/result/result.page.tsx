import { Icons } from '@/assets/icons/icons';
import { ResultCard } from '@/modules/swipes/results/result-card';
import { useResultStore } from '@/modules/swipes/results/result.store';
import useTheme from '@/shared/hooks/useTheme';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import { MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

export const ResultPage = () => {
  const { result } = useResultStore();
  const webApp = useWebApp();
  const navigate = useNavigate();

  const { background } = useTheme();

  const { setRoute } = useServerRouteStore();

  const setMainScreen = () => {
    navigate('/');
  };

  const setSwipes = () => {
    setRoute('swiping');
  };

  useEffect(() => {
    webApp.BackButton.show();
    webApp.BackButton.onClick(setSwipes);

    return () => {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setSwipes);
    };
  }, []);

  return (
    <div className="min-h-screen h-full p-5">
      <div className="flex pb-2 justify-between">
        <h1 className="text-xl font-medium pb-2">Ваши мэтчи</h1>
      </div>
      <motion.div
        onTap={setSwipes}
        className="cursor-pointer active:scale-75 active:opacity-75 transition-all absolute top-[5vw] right-[5vw]"
      >
        <Icons.swipes fill={background} className="text-primary" />
      </motion.div>
      <AnimatePresence>
        <motion.div
          className="space-y-5 h-screen overflow-scroll w-full pt-4 pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          {result?.top.map((x) => (
            <motion.div
              key={`result_card_${x.card.id}`}
              variants={childVariants}
            >
              <ResultCard card={x.card} likes={x.likes} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <MainButton onClick={setMainScreen} text={'На Главную'} />
    </div>
  );
};
