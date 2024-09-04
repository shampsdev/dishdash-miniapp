import { useLobbyStore } from '@/shared/stores/lobby.store';
import { useMatchStore } from '@/shared/stores/match.store';
import { Event } from '../event';

class ReleaseMatchEvent extends Event {
  handle() {
    const { setMatchCard, setMatchId } = useMatchStore();
    const { setState } = useLobbyStore();
    setMatchCard(null);
    setMatchId(null);
    setState('swipes');
  }
}

export const releaseMatchEvent = new ReleaseMatchEvent();
