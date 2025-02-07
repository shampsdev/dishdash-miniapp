import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Card } from '@/shared/types/card.interface';
import { Event } from '../event';

class CardEvent extends Event {
  handle(data: { cards: Card[] }) {
    const { setCards, cards } = getLobbyStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    setCards([...cards, ...data.cards]);
    setIsLoading(false);
  }
}

export const cardEvent = new CardEvent();
