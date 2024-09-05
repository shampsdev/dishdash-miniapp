import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Card } from '@/shared/types/game.type';
import { Event } from '../event';

class CardEvent extends Event {
  handle(data: { card: Card }) {
    const { setCards, cards } = getLobbyStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    setCards([...cards, data.card]);
    setIsLoading(false);
  }
}

export const cardEvent = new CardEvent();
