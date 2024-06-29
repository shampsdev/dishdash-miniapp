import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import { Card } from '../../types/game.type';
import { Match } from '../../types/game.type';
import toast from 'react-hot-toast';

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

  const ids = [
    '506CGAYS',
    'AITP205U',
    'B7WTF3ZM',
    'YNBN1DM2',
    'PDUYWMRI',
    'ISSSMH2X',
    'XFRN3IHX',
    '7IY4SXXV',
    'LH21MNWI',
    'GR7PTN05',
    'I1KD36PP',
    '1A30945P',
  ];

  const joinLobby = (lobbyId: string) => {
    emit('joinLobby', {
      // userId: ids[Math.floor(Math.random()*ids.length)],
      userId: '543G983E',
      lobbyId: lobbyId,
    });
    setTimeout(() => {
      emit('startSwipes');
    }, 250);
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

    subscribe('userJoined', () => {
      toast.success('joined');
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
