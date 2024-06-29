import { Card } from '@/types/game.type';
import { create } from 'zustand';

type MatchStatusType = 'match' | 'swiping' | 'matchCard';

type Store = {
  id: number | null;
  card: Card | null;
  matchStatus: MatchStatusType;
  setMatchStatus: (matchStatus: MatchStatusType) => void;
  setMatchCard: (card: Card | null) => void;
  setMatchId: (id: number | null) => void;
};

export const useMatchStore = create<Store>()((set) => ({
  id: 2,
  matchStatus: 'match',
  setMatchStatus: (matchStatus: MatchStatusType) => set({ matchStatus }),
  card: {
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
  setMatchCard: (card: Card | null) => set({ card }),
  setMatchId: (id: number | null) => set({ id }),
}));
