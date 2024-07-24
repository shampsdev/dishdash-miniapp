import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import { Card } from '../../types/game.type';
import { Match } from '../../types/game.type';
import toast from 'react-hot-toast';

import { useLobbyStore } from '@/store/lobby.store';
import { useMatchStore } from '@/store/match.store';
import { User } from '@/types/user.type';
import { useAuth } from '@/shared/hooks/useAuth';

export type SwipeType = 'like' | 'dislike';

interface ContextProps {
  joinLobby: (lobbyId: string) => void;
  swipe: (swipeType: SwipeType) => void;
}

export const SwipeContext = React.createContext<ContextProps>({
  joinLobby: () => {},
  swipe: () => {},
});

interface SwipeProviderProps {
  children?: React.ReactNode;
}

export const SwipeProvider = ({ children }: SwipeProviderProps) => {
  const { subscribe, emit } = useSocket();

  const { setCards, cards } = useLobbyStore();
  const { setMatchCard, setMatchStatus, setMatchId } = useMatchStore();

  const { user, authenticated } = useAuth();

  const joinLobby = (lobbyId: string) => {
    if (authenticated) {
      console.log(user);
      emit('joinLobby', {
        userId: user.id,
        lobbyId: lobbyId,
      });
      setTimeout(() => {
        emit('startSwipes');
      }, 250);
    }
  };

  const swipe = (swipeType: SwipeType) => {
    console.log(swipeType);
    emit('swipe', {
      swipeType,
    });
  };

  useEffect(() => {
    subscribe('card', (card: { card: Card }) => {
      console.log(card);
      setCards([...cards, card.card]);
    });

    subscribe('match', (match: Match) => {
      console.log(match);
      setMatchCard(match.card);
      setMatchStatus('matchCard');
      setMatchId(match.id);
    });

    subscribe('userJoined', (user: User) => {
      toast.success(`Пользователь ${user.name} присоеденился`);
    });
  }, [subscribe]);

  return (
    <SwipeContext.Provider
      value={{
        joinLobby,
        swipe,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipes = () => {
  return useContext(SwipeContext);
};
