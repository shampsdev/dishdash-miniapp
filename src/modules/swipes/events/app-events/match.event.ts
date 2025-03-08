import { getMatchStoreMethods } from '@/modules/swipes/match/match.store';
import { Match } from '@/modules/swipes/interfaces/match.interface';
import { Event } from '../event';
import { getServerRouteMethods } from '@/shared/stores/server-route.store';

class MatchEvent extends Event {
  handle(data: Match) {
    const { setMatchCard } = getMatchStoreMethods();
    const { setRoute } = getServerRouteMethods();

    setMatchCard({
      card: data.card
    });

    setRoute('match');
  }
}

export const matchEvent = new MatchEvent();
