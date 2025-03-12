import { Icons } from '@/assets/icons/icons';
import { useLobbyStore } from '@/modules/swipes/lobby/lobby.store';
import { ResultCard } from '@/modules/swipes/results/result-card';
import { useResultStore } from '@/modules/swipes/results/result.store';
import { useTheme } from '@/shared/hooks/useTheme';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import face from '@/assets/icons/hmmm.png';
import { backButton, mainButton } from '@telegram-apps/sdk-react';

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
  const navigate = useNavigate();

  const { users } = useLobbyStore();
  const { background } = useTheme();
  const [visibleCount, setVisibleCount] = useState(5);

  const { setRoute } = useServerRouteStore();

  const setMainScreen = () => {
    navigate('/');
  };

  const setSwipes = () => {
    setRoute('swiping');
  };

  useEffect(() => {
    backButton.show();
    backButton.onClick(setSwipes);

    if (result && result.top.length > 0) {
      mainButton.setParams({
        isVisible: true,
        text: 'На Главную'
      });
      mainButton.onClick(setMainScreen);
    } else {
      mainButton.setParams({
        isVisible: true,
        text: 'К свайпам'
      });
      mainButton.onClick(setSwipes);
    }

    return () => {
      backButton.hide();
      backButton.offClick(setSwipes);

      mainButton.setParams({
        isVisible: false
      });
      mainButton.offClick(setMainScreen);
    };
  }, []);

  const matches =
    result?.top.filter((x) => x.likes.length >= users.length / 2) || [];
  const displayedMatches = matches.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="min-h-screen h-full p-5">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-xl font-medium">Ваши мэтчи</h1>
        <motion.div
          onTap={setSwipes}
          className="cursor-pointer active:scale-75 active:opacity-75 transition-all"
        >
          <Icons.swipes fill={background} className="text-primary" />
        </motion.div>
      </div>
      {result && result.top.length > 0 ? (
        <AnimatePresence>
          <motion.div
            className="space-y-5 h-screen no-scrollbar overflow-scroll w-full pt-4 pb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
          >
            {displayedMatches.map((x) => (
              <motion.div
                key={`result_card_${x.card.id}`}
                variants={childVariants}
              >
                <ResultCard card={x.card} likes={x.likes} />
              </motion.div>
            ))}
            {visibleCount < matches.length && (
              <div
                onClick={loadMore}
                className="active:scale-95 transition-all w-full text-center cursor-pointer py-2 px-4 bg-secondary text-primary-foreground rounded-lg"
              >
                показать ещё
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="flex space-y-3 h-[75vh] items-center justify-center flex-col">
          <div className="w-[30%] mx-auto pb-2">
            <img src={face} />
          </div>
          <p className="text-2xl font-medium">Пока ничего нет</p>
          <p className="w-[90%] text-center">Здесь появятся ваши мэтчи</p>
        </div>
      )}
    </div>
  );
};
