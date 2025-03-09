import { getErrorStoreMethods } from '@/shared/stores/error.store';
import { Event } from '../event';

class ErrorEvent extends Event {
  handle(data: any) {
    const { setError } = getErrorStoreMethods();
    setError(data);
    console.error('Scoket error:', data);
  }
}

export const errorEvent = new ErrorEvent();
