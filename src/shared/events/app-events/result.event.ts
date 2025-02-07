import { Result } from '@/shared/types/results.interface';
import { Event } from '../event';
import { getResultStoreMethods } from '@/shared/stores/result-card.store';

class ResultEvent extends Event {
  handle(data: Result): void {
    const { setResult } = getResultStoreMethods();
    setResult(data);
  }
}

export const resultEvent = new ResultEvent();
