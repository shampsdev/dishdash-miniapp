import { Event } from '../event';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';

class ErrorEvent extends Event {
  handle(data: any) {
    const { setIsLoading } = getLoadingStoreMethods();
    setIsLoading(false);
    console.error('Scoket error:', data);
  }
}

export const errorEvent = new ErrorEvent();
