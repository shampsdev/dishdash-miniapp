import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getMatchStoreMethods } from '@/shared/stores/match.store';
import { Match } from '@/shared/types/match.interface';
import { Event } from '../event';
import { getVoteStoreMethods } from '@/shared/stores/vote.store';

class MatchEvent extends Event {
  handle(data: Match) {
    const { setMatchCard } = getMatchStoreMethods();
    const { resetStore } = getVoteStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    const { setState } = getLobbyStoreMethods();

    resetStore();
    setState('match');
    setMatchCard({
      id: data.id,
      card: data.card
    });
    setIsLoading(false);
  }
}

export const matchEvent = new MatchEvent();
