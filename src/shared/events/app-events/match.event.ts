import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getMatchStoreMethods } from '@/shared/stores/match.store';
import { Match } from '@/shared/types/match.interface';
import { Event } from '../event';

class MatchEvent extends Event {
  handle(data: Match) {
    const { setMatchCard } = getMatchStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    const { setState } = getLobbyStoreMethods();

    setState('match');
    setMatchCard({
      id: data.id,
      card: data.card,
    });
    setIsLoading(false);
  }

  vote(id: number, option: number) {
    this.emit('vote', { id, option });
  }
}

export const matchEvent = new MatchEvent();
