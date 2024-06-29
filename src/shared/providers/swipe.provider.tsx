import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import { Card } from '../../types/game.type';
import { Match } from '../../types/game.type';

import { useLobbyStore } from '@/store/lobby.store';
import { useMatchStore } from '@/store/match.store';

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

  const joinLobby = (lobbyId: string) => {
    emit('joinLobby', {
      userId: '543G983E',
      lobbyId: lobbyId,
    });
    setTimeout(() => {
      emit('startSwipes');
    }, 250);
  };

  const swipe = (swipeType: SwipeType) => {
    emit('swipe', {
      swipeType,
    });
  };

  useEffect(() => {
    subscribe('card', (card: { card: Card }) => {
      setCards([...cards, card.card]);
    });

    subscribe('match', (match: Match) => {
      setMatchCard(match.card);
      setMatchStatus('matchCard');
      setMatchId(match.id);
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
