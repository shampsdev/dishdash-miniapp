import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useRoutes } from '@/shared/hooks/useRoutes';
import { useSocket } from '@/shared/hooks/useSocket';
import { useAuth } from '@/shared/hooks/useAuth';

import { fetchTags } from '@/shared/api/tags.api';
import { useLobbyStore } from '@/modules/swipes/lobby/lobby.store';

import { useResultStore } from '@/modules/swipes/results/result.store';
import { Toaster } from 'react-hot-toast';
import { useSettingsStore } from '@/modules/swipes/settings/settings.store';
import { cardEvent } from '@/modules/swipes/events/app-events/card.event';
import { errorEvent } from '@/modules/swipes/events/app-events/error.event';
import { matchEvent } from '@/modules/swipes/events/app-events/match.event';
import { resultEvent } from '@/modules/swipes/events/app-events/result.event';
import { swipesEvent } from '@/modules/swipes/events/app-events/swipes.event';
import { userEvents } from '@/modules/swipes/events/app-events/user.event';
import { settingsUpdateEvent as settingsEvent } from '@/modules/swipes/events/app-events/settings.event';

export const SwipesLayout = () => {
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
      resetLobbyStore();
      resetSettingsStore();
      resetResultStore();
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
  }, [id, user, ready]);

  return (
    <>
      <Toaster
        toastOptions={{
          className: '!bg-secondary !text-foreground !rounded-xl !w-full'
        }}
      />
      <Outlet />
    </>
  );
};
