import { Card } from '@/shared/types/card.interface';
import { create } from 'zustand';

interface MatchStore {
  id: number | null;
  card: Card | null;
}

interface MatchStoreActions {
  setMatchCard: (card: MatchStore) => void;
}

export const useMatchStore = create<MatchStore & MatchStoreActions>()(
  (set) => ({
    id: null,
    card: null,
    setMatchCard: (card: MatchStore) => set(card),
  }),
);

export function getMatchStoreMethods() {
  const { id, card, setMatchCard } = useMatchStore.getState();
  return { id, card, setMatchCard };
}
