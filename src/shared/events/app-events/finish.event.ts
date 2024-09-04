import { useResultCardStore } from '@/shared/stores/result-card.store';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { Card } from '@/shared/types/game.type';
import { useLoadingStore } from '@/shared/stores/loading.store';
import { Event } from '../event';

class FinishEvent extends Event {
  handle(data: { result: Card }) {
    const { setResultCard } = useResultCardStore();
    const { setIsLoading } = useLoadingStore();
    const { setState } = useLobbyStore();
    console.log(data);
    setResultCard(data.result);
    setState('result');
    setIsLoading(false);
  }
}

export const finishEvent = new FinishEvent();
