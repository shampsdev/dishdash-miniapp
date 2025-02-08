import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Event } from '../event';

import { SwipeType } from '@/modules/game/swipes';

class SwipesEvent extends Event {
  handle() {
    const { setState } = getLobbyStoreMethods();
    setState('swiping');
  }

  start() {
    this.emit('startSwipes');
    this.handle();
  }

  swipe(cardId: number, swipeType: SwipeType) {
    this.emit('swipe', { swipeType, cardId });
  }
}

export const swipesEvent = new SwipesEvent();
