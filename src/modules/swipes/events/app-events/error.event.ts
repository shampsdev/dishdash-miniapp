import { getLobbyStoreMethods } from '@/modules/swipes/stores/lobby.store';
import { Event } from '../event';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';

class ErrorEvent extends Event {
  handle(data: any) {
    const { setState } = getLobbyStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    setIsLoading(false);
    console.error('Scoket error:', data);
    setState('error');
  }
}

export const errorEvent = new ErrorEvent();
