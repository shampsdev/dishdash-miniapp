import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

import GameCards from '@/moduls/game/GameCards';
import { useSwipes } from '@/shared/providers/swipe.provider';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMatchStore } from '@/store/match.store';
import MatchCard from '@/moduls/game/MatchCard';
import { Toaster } from 'react-hot-toast';

const Game = () => {
  const { joinLobby } = useSwipes();
  const { card } = useMatchStore();
  const { id } = useParams(); //lobbyId

  useEffect(() => {
    if (id) joinLobby(id);
    console.log('connected... (xuy)');
  }, []);

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

  return (
    <main className="min-h-screen h-full mx-auto bg-gameSwipe-neutral">
      <Toaster />
      <AnimatePresence mode="wait">
        <motion.div
          key="gameScreen1"
          id="gameScreen"
          variants={gameScreenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {card == null ? <GameCards /> : <MatchCard data={card} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Game;
