import { getMatchStoreMethods } from '@/modules/swipes/match/match.store';
import { Match } from '@/modules/swipes/interfaces/match.interface';
import { Event } from '../event';
import { getServerRouteMethods } from '@/shared/stores/server-route.store';
import { getLobbyStoreMethods } from '../../lobby/lobby.store';

class MatchEvent extends Event {
  handle(data: Match) {
    const { setMatchCard } = getMatchStoreMethods();
    const { setRoute } = getServerRouteMethods();
    const { users } = getLobbyStoreMethods();

    setMatchCard({
      card: data.card
    });

    if (users.length > 1) setRoute('match');
  }
}

export const matchEvent = new MatchEvent();
