import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useRoutes } from '@/shared/hooks/useRoutes';
import { useSocket } from '@/shared/hooks/useSocket';
import { useAuth } from '@/shared/hooks/useAuth';

import { fetchTags } from '@/shared/api/tags.api';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { useSettingsStore } from '@/shared/stores/settings.store';

import { cardEvent } from '@/shared/events/app-events/card.event';
import { userEvents } from '@/shared/events/app-events/user.event';
import { settingsUpdateEvent as settingsEvent } from '@/shared/events/app-events/settings.event';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { errorEvent } from '@/shared/events/app-events/error.event';
import { resultEvent } from '@/shared/events/app-events/result.event';
import { matchEvent } from '@/shared/events/app-events/match.event';

import { GameComponent } from '@/components/ui/game';
import { useResultStore } from '@/shared/stores/result.store';

export const GamePage = () => {
  const { setLobbyId, lobbyId, resetStore: resetLobbyStore } = useLobbyStore();
  const { setTags, resetStore: resetSettingsStore } = useSettingsStore();
  const { resetStore: resetResultStore } = useResultStore();

  const { id } = useParams<{ id: string }>(); //lobbyId
  const { user, addRecentLobby, recentLobbies, ready } = useAuth();
  const { socket, subscribe } = useSocket();
  useRoutes();

  useEffect(() => {
    fetchTags().then((tags) => {
      if (tags != undefined) setTags(tags);
    });
  }, []);

  useEffect(() => {
    socket?.connect();

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const socketAbortController = new AbortController();
    const signal = socketAbortController.signal;

    subscribe('cards', (data) => cardEvent.handle(data), signal);
    subscribe('results', (data) => resultEvent.handle(data), signal);
    subscribe('userJoined', (data) => userEvents.userJoin(data), signal);
    subscribe('userLeft', (data) => userEvents.userLeft(data), signal);
    subscribe('settingsUpdate', (data) => settingsEvent.handle(data), signal);
    subscribe('startSwipes', () => swipesEvent.handle(), signal);
    subscribe('error', (data) => errorEvent.handle(data), signal);
    subscribe('match', (data) => matchEvent.handle(data), signal);

    return () => {
      socketAbortController.abort();
    };
  }, []);

  useEffect(() => {
    if (id && !!user && lobbyId === null) {
      setLobbyId(id);
      if (!recentLobbies.includes(id)) {
        addRecentLobby(id);
      }
      userEvents.joinLobby(id, user?.id);
    }

    return () => {
      resetLobbyStore();
      resetSettingsStore();
      resetResultStore();
    };
  }, [id, user, ready]);

  return <GameComponent />;
};
