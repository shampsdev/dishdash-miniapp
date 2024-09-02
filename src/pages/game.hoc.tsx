import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

import GameCards from '@/modules/game/GameCards';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MatchCard from '@/modules/game/MatchCard';
import { Toaster } from 'react-hot-toast';
import { useSwipes } from '@/shared/providers/swipe.provider';
import { useInitData } from '@vkruglikov/react-telegram-web-app';
import { useAuth } from '@/shared/hooks/useAuth';
import LobbySettingsPage from './lobby-settings.page';
import { GameState, useLobbyStore } from '@/shared/stores/lobby.store';
import ResultPage from './result.page';

const Game = () => {
  const { joinLobby } = useSwipes();
  const { state, setLobbyId, lobbyId } = useLobbyStore();
  const { id } = useParams(); //lobbyId
  const { user, authenticated, loginUser, ready } = useAuth();
  const [initDataUnsafe] = useInitData();

  useEffect(() => {
    if (user === undefined && initDataUnsafe?.user && ready) {
      loginUser({
        name: initDataUnsafe.user.first_name,
        avatar: '',
        telegram: initDataUnsafe.user.id,
      });
    }
    if (id && authenticated && lobbyId == undefined) {
      setLobbyId(id);
      joinLobby(id);
    }
  }, [id, user, ready]);

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

  const hoc = (state: GameState) => {
    switch (state) {
      case 'match':
        return <MatchCard />;
      case 'settings':
        return <LobbySettingsPage />;
      case 'swipes':
        return <GameCards />;
      case 'result':
        return <ResultPage />;
    }
  };

  return (
    <main className="max-h-screen h-full mx-auto bg-gameSwipe-neutral">
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
          {hoc(state)}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Game;
