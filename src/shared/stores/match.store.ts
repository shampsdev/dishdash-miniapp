import { Card } from '@/shared/types/game.type';
import { create } from 'zustand';

type Store = {
  id: number | null;
  card: Card | null;
  setMatchCard: (card: Card | null) => void;
  setMatchId: (id: number | null) => void;
};

export const useMatchStore = create<Store>()((set) => ({
  id: null,
  card: null,
  setMatchCard: (card: Card | null) => set({ card }),
  setMatchId: (id: number | null) => set({ id }),
}));

export function getMatchStoreMethods() {
  const { id, card, setMatchCard, setMatchId } = useMatchStore.getState();
  return { id, card, setMatchCard, setMatchId };
}
