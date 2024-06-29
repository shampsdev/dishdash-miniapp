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
  id: null,
  matchStatus: 'swiping',
  setMatchStatus: (matchStatus: MatchStatusType) => set({ matchStatus }),
  card: null,
  setMatchCard: (card: Card | null) => set({ card }),
  setMatchId: (id: number | null) => set({ id }),
}));