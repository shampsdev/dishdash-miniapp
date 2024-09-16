import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useInitData } from '@vkruglikov/react-telegram-web-app';
import { useAuth } from '@/shared/hooks/useAuth';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { userEvents } from '@/shared/events/app-events/user.event';

import { useRoutes } from '@/shared/hooks/useRoutes';
import { GameComponent } from '@/components/ui/game';

const GamePage = () => {
  const { setLobbyId, lobbyId } = useLobbyStore();
  const { id } = useParams<{ id: string }>(); //lobbyId
  const { user, createUser, ready } = useAuth();
  const [initDataUnsafe] = useInitData();
  useRoutes();

  useEffect(() => {
    if (user === undefined && initDataUnsafe?.user && ready) {
      createUser({
        name: initDataUnsafe.user.username ?? initDataUnsafe.user.first_name,
        avatar: '',
        telegram: initDataUnsafe.user.id,
      });
    }
    if (id && !!user && lobbyId == undefined) {
      setLobbyId(id);
      userEvents.joinLobby(id, user?.id);
    }
  }, [id, user, ready]);

  return <GameComponent />;
};

export default GamePage;
