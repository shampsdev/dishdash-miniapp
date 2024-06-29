import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import { Card } from '../../types/game.type';
import { Match } from '../../types/game.type';

import { useLobbyStore } from '@/store/lobby.store';
import { useMatchStore } from '@/store/match.store';

import { userId } from '@/store/userContext'; 

interface ContextProps {
  joinLobby: (lobbyId: string) => void;
}

export const SwipeContext = React.createContext<ContextProps>({
  joinLobby: () => {},
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
      userId,
      lobbyId,
    });
    emit('startSwipes');
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
        joinLobby
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipes = () => {
  return useContext(SwipeContext);
};