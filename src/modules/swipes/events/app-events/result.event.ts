import { Result } from '@/modules/swipes/interfaces/results.interface';
import { Event } from '../event';
import { getResultStoreMethods } from '../../results/result.store';
import toast from 'react-hot-toast';
import { getServerRouteMethods } from '@/shared/stores/server-route.store';

class ResultEvent extends Event {
  handle(data: Result): void {
    const { setResult } = getResultStoreMethods();
    const { route } = getServerRouteMethods();
    setResult(data);

    const length = data?.top?.length ?? 0;

    // Show a toast every time length hits a multiple of 5
    if (length % 5 === 0 && length > 0 && route != 'results') {
      toast(`В результатах уже ${length} мест!`, {
        duration: 1000
        // icon: <Icons.heart />
      });
    }
  }
}

export const resultEvent = new ResultEvent();
