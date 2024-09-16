import { getResultStoreMethods } from '@/shared/stores/result-card.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Card } from '@/shared/types/card.interface';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { Event } from '../event';

class FinishEvent extends Event {
  handle(data: { result: Card }) {
    const { setResultCard } = getResultStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    const { setState } = getLobbyStoreMethods();
    console.log(data);
    setResultCard(data.result);
    setState('result');
    setIsLoading(false);
  }
}

export const finishEvent = new FinishEvent();
