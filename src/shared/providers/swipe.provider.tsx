import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import { Card } from '../../types/game.type';
import { Match } from '../../types/game.type';

import { useLobbyStore } from '@/store/lobby.store';
import { useMatchStore } from '@/store/match.store';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types/user.type';
import { useAuth } from '@/shared/hooks/useAuth';

export type SwipeType = 'like' | 'dislike';

interface ContextProps {
  swipe: (swipeType: SwipeType) => void;
  startSwipes: () => void;
  joinLobby: (lobbyId: string) => void;
}

export const SwipeContext = React.createContext<ContextProps>({
  swipe: () => {},
  startSwipes: () => {},
  joinLobby: () => {},
});

interface SwipeProviderProps {
  children?: React.ReactNode;
}

export const SwipeProvider = ({ children }: SwipeProviderProps) => {
  const { subscribe, emit, socket } = useSocket();
  const { setCards, setState, cards } = useLobbyStore();
  const { setMatchCard, setMatchId } = useMatchStore();

  const { user, authenticated } = useAuth();
  const navigate = useNavigate();

  const startSwipes = () => {
    emit('startSwipes');
    setState('swipes');
  };

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
      setState('match');
      setMatchCard(match.card);
      setMatchId(match.id);
    });

    subscribe('userJoined', (user: User) => {
      //toast.success(`Пользователь ${user.name} присоеденился`);
    });

    subscribe('startSwipes', () => {
      setState('swipes');
      console.log(`Swipes started in lobby`);
    });

    subscribe('releaseMatch', () => {
      setState('swipes');
    });
  }, [socket]);

  return (
    <SwipeContext.Provider
      value={{
        startSwipes,
        swipe,
        joinLobby,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipes = () => {
  return useContext(SwipeContext);
};
