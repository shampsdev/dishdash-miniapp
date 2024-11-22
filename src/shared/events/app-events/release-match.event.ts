import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getMatchStoreMethods } from '@/shared/stores/match.store';
import { Event } from '../event';

class ReleaseMatchEvent extends Event {
  handle() {
    const { setMatchCard } = getMatchStoreMethods();
    const { setState } = getLobbyStoreMethods();
    setMatchCard({
      id: null,
      card: null,
    });
    setState('swiping');
  }
}

export const releaseMatchEvent = new ReleaseMatchEvent();
