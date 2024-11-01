import { getResultStoreMethods } from '@/shared/stores/result-card.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { Event } from '../event';
import { Result } from '@/shared/types/results.interface';

class FinishEvent extends Event {
  handle(data: Result) {
    const { setResult } = getResultStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    const { setState } = getLobbyStoreMethods();

    setResult(data);
    setState('result');
    setIsLoading(false);
  }
}

export const finishEvent = new FinishEvent();
