import { Card } from '@/types/game.type';
import { create } from 'zustand';

type LobbyProps = {
  lobbyId: string;
  cards: Card[];
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
};

export const useLobbyStore = create<LobbyProps>((set) => ({
  lobbyId: '',
  users: [],
  cards: [
    {
      Title: 'Булочная Ф. Вольчека',
      Image: './',
      Description:
        'Место, где можно насладиться свежей выпечкой и пирогами с различными начинками.',
      ID: 0,
      ShortDescription: '',
      Location: {
        lat: 0,
        lon: 0,
      },
      Address: '',
      Type: 'BAR',
      Price: 0,
    },
    {
      Title: 'Булочная Ф. Вольчека',
      Image: './',
      Description:
        'Место, где можно насладиться свежей выпечкой и пирогами с различными начинками.',
      ID: 0,
      ShortDescription: '',
      Location: {
        lat: 0,
        lon: 0,
      },
      Address: '',
      Type: 'BAR',
      Price: 0,
    },
    {
      Title: 'Булочная Ф. Вольчека',
      Image: './',
      Description:
        'Место, где можно насладиться свежей выпечкой и пирогами с различными начинками.',
      ID: 1,
      ShortDescription: '',
      Location: {
        lat: 0,
        lon: 0,
      },
      Address: '',
      Type: 'BAR',
      Price: 0,
    },
    {
      Title: 'Булочная Ф. Вольчека',
      Image: './',
      Description:
        'Место, где можно насладиться свежей выпечкой и пирогами с различными начинками.',
      ID: 2,
      ShortDescription: '',
      Location: {
        lat: 0,
        lon: 0,
      },
      Address: '',
      Type: 'BAR',
      Price: 0,
    },
  ],
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
}));
