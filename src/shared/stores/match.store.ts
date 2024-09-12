import { Card } from '@/shared/types/game.type';
import { create } from 'zustand';

interface MatchStore {
  id: number | null;
  card: Card | null;
  setMatchCard: (card: Card | null, id: number | null) => void;
}

export const useMatchStore = create<MatchStore>()((set) => ({
  id: null,
  card: null,
  setMatchCard: (card: Card | null) => set({ card }),
}));

export function getMatchStoreMethods() {
  const { id, card, setMatchCard } = useMatchStore.getState();
  return { id, card, setMatchCard };
}
