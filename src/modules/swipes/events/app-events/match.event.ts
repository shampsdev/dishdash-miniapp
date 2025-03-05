import { getMatchStoreMethods } from '@/modules/swipes/match/match.store';
import { Match } from '@/modules/swipes/interfaces/match.interface';
import { Event } from '../event';

class MatchEvent extends Event {
  handle(data: Match) {
    const { setMatchCard } = getMatchStoreMethods();

    setMatchCard({
      card: data.card
    });
  }
}

export const matchEvent = new MatchEvent();
