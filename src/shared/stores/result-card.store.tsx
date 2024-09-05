import { Card } from '@/shared/types/game.type';
import { create } from 'zustand';

type Store = {
  card: Card | null;
  setResultCard: (card: Card) => void;
};

export const useResultCardStore = create<Store>()((set) => ({
  card: null,
  setResultCard: (card: Card) => set({ card }),
}));

export function getResultStoreMethods() {
  const { card, setResultCard } = useResultCardStore.getState();
  return { card, setResultCard };
}
