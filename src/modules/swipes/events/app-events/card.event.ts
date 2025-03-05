import { getLobbyStoreMethods } from '@/modules/swipes/lobby/lobby.store';
import { Event } from '../event';
import { Card } from '@/modules/swipes/interfaces/card.interface';

class CardEvent extends Event {
  handle(data: { cards: Card[] }) {
    const { setCards, cards } = getLobbyStoreMethods();
    setCards([...data.cards, ...cards]);
  }
}

export const cardEvent = new CardEvent();
