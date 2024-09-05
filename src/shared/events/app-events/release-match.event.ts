import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getMatchStoreMethods } from '@/shared/stores/match.store';
import { Event } from '../event';

class ReleaseMatchEvent extends Event {
  handle() {
    const { setMatchCard, setMatchId } = getMatchStoreMethods();
    const { setState } = getLobbyStoreMethods();
    setMatchCard(null);
    setMatchId(null);
    setState('swipes');
  }
}

export const releaseMatchEvent = new ReleaseMatchEvent();
