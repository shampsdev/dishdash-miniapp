import { useLobbyStore } from '@/shared/stores/lobby.store';
import { Event } from '../event';

import { useLoadingStore } from '@/shared/stores/loading.store';
import { SwipeType } from '@/modules/game/GameCards';

class SwipesEvent extends Event {
  handle() {
    const { setState } = useLobbyStore();
    setState('swipes');
  }

  start() {
    this.emit('startSwipes');
    this.handle();
  }

  swipe(swipeType: SwipeType) {
    const { setIsLoading } = useLoadingStore();
    setIsLoading(true);
    this.emit('swipe', { swipeType });
  }
}

export const swipesEvent = new SwipesEvent();
