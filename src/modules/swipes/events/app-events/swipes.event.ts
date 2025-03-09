import { Event } from '../event';
import { SwipeType } from '@/pages/swipes/swipes.page';
import { getServerRouteMethods } from '@/shared/stores/server-route.store';

class SwipesEvent extends Event {
  handle() {
    const { route, setRoute } = getServerRouteMethods();
    if (route == 'lobby') setRoute('swiping');
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
