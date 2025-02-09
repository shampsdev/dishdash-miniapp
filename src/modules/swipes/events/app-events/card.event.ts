import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getLobbyStoreMethods } from '@/modules/swipes/stores/lobby.store';
import { Event } from '../event';
import { Card } from '@/modules/swipes/interfaces/card.interface';

class CardEvent extends Event {
  handle(data: { cards: Card[] }) {
    const { setCards, cards } = getLobbyStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    setCards([...data.cards, ...cards]);
    setIsLoading(false);
  }
}

export const cardEvent = new CardEvent();
