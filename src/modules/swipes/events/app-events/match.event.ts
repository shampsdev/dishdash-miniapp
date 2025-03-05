import { getLobbyStoreMethods } from '@/modules/swipes/lobby/lobby.store';
import { getMatchStoreMethods } from '@/modules/swipes/match/match.store';
import { Match } from '@/modules/swipes/interfaces/match.interface';
import { Event } from '../event';

class MatchEvent extends Event {
  handle(data: Match) {
    console.log(data);

    const { setMatchCard } = getMatchStoreMethods();
    const { setState } = getLobbyStoreMethods();

    setState('match');
    setMatchCard({
      card: data.card
    });
  }
}

export const matchEvent = new MatchEvent();
