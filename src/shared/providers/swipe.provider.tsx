import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useSocket } from './socket.provider';
import { Card } from '../types/game.type';
import { Match } from '../types/game.type';

import { useLobbyStore } from '@/shared/stores/lobby.store';
import { useMatchStore } from '@/shared/stores/match.store';
import { useResultCardStore } from '@/shared/stores/result-card.store';
import { User } from '@/shared/types/user.type';
import { useAuth } from '@/shared/hooks/useAuth';
import { Settings } from '../types/settings.type';

export type SwipeType = 'like' | 'dislike';

interface ContextProps {
  swipe: (swipeType: SwipeType) => void;
  startSwipes: () => void;
  joinLobby: (lobbyId: string) => void;
  updateSettings: (settings: Settings) => void;
  vote: (id: number, option: number) => void;
}

export const SwipeContext = React.createContext<ContextProps>({
  swipe: () => {},
  startSwipes: () => {},
  joinLobby: () => {},
  updateSettings: () => {},
  vote: () => {},
});

interface SwipeProviderProps {
  children?: React.ReactNode;
}

export const SwipeProvider = ({ children }: SwipeProviderProps) => {
  const { subscribe, emit, socket } = useSocket();
  const { setCards, setState, cards, setSettings, addUser, removeUser } =
    useLobbyStore();
  const { setMatchCard, setMatchId } = useMatchStore();
  const { setResultCard } = useResultCardStore();

  const { user, authenticated } = useAuth();

  const startSwipes = () => {
    emit('startSwipes');
    setState('swipes');
  };

  const joinLobby = (lobbyId: string) => {
    if (authenticated) {
      emit('joinLobby', {
        userId: user?.id,
        lobbyId: lobbyId,
      });
    }
  };

  const updateSettings = (settings: Settings) => {
    setSettings(settings);
    emit('settingsUpdate', settings);
  };

  const swipe = (swipeType: SwipeType) => {
    emit('swipe', {
      swipeType,
    });
  };

  const vote = (id: number, option: number) => {
    emit('vote', {
      id,
      option,
    });
  };

  useEffect(() => {
    subscribe('card', (card: { card: Card }) => {
      setCards([...cards, card.card]);
    });

    subscribe('match', (match: Match) => {
      setState('match');
      setMatchCard(match.card);
      setMatchId(match.id);
    });

    subscribe('userJoined', (user: User) => {
      toast.success(`Пользователь ${user.name} присоединился`);
      addUser({ ...user });
    });

    subscribe('userLeft', (user: User) => {
      toast.error(`Пользователь ${user.name} вышел`);
      removeUser(user.id);
    });

    subscribe('settingsUpdate', (settings: Settings) => {
      setSettings(settings);
    });

    subscribe('startSwipes', () => {
      setState('swipes');
    });

    subscribe('releaseMatch', () => {
      setMatchCard(null);
      setMatchId(null);
      setState('swipes');
    });

    subscribe('finish', (result: { result: Card }) => {
      setResultCard(result.result);
      setState('result');
    });
  }, [socket]);

  return (
    <SwipeContext.Provider
      value={{
        startSwipes,
        swipe,
        joinLobby,
        updateSettings,
        vote,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipes = () => {
  return useContext(SwipeContext);
};
