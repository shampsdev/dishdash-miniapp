import { Card } from '@/shared/types/card.interface';
import { create } from 'zustand';

interface MatchStore {
  card: Card | null;
}

interface MatchStoreActions {
  setMatchCard: (card: MatchStore) => void;
}

export const useMatchStore = create<MatchStore & MatchStoreActions>()(
  (set) => ({
    card: null,
    setMatchCard: (card: MatchStore) => set(card)
  })
);

export function getMatchStoreMethods() {
  const { card, setMatchCard } = useMatchStore.getState();
  return { card, setMatchCard };
}
