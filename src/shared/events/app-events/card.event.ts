import { useLoadingStore } from '@/shared/stores/loading.store';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { Card } from '@/shared/types/game.type';
import { Event } from '../event';

class CardEvent extends Event {
  handle(data: { card: Card }) {
    const { setCards, cards } = useLobbyStore();
    const { setIsLoading } = useLoadingStore();
    setCards([...cards, data.card]);
    setIsLoading(false);
  }
}

export const cardEvent = new CardEvent();
