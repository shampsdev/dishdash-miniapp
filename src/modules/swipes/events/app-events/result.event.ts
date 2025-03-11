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

    const emojis = [
      '️️❤️',
      '✨',
      '🤩',
      '🎉',
      '👀',
      '💃',
      '🐣',
      '🦔',
      '🍋',
      '🌮',
      '🍖',
      '🍹',
      '🍸'
    ];

    if (length % 5 === 0 && length > 0 && route != 'results') {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      toast(`В результатах уже ${length} мест!`, {
        duration: 1500,
        icon: randomEmoji
      });
    }
  }
}

export const resultEvent = new ResultEvent();
