import { Result } from '@/modules/swipes/interfaces/results.interface';
import { Event } from '../event';
import { getResultStoreMethods } from '../../results/result.store';

class ResultEvent extends Event {
  handle(data: Result): void {
    const { setResult } = getResultStoreMethods();
    setResult(data);
  }
}

export const resultEvent = new ResultEvent();
