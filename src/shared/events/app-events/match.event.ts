import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getMatchStoreMethods } from '@/shared/stores/match.store';
import { Match } from '@/shared/types/game.type';
import { Event } from '../event';

class MatchEvent extends Event {
  handle(data: Match) {
    const { setMatchCard, setMatchId } = getMatchStoreMethods();
    const { setIsLoading } = getLoadingStoreMethods();
    const { setState } = getLobbyStoreMethods();

    setState('match');
    setMatchCard(data.card);
    setMatchId(data.id);
    setIsLoading(false);
  }

  vote(id: number, option: number) {
    this.emit('vote', { id, option });
  }
}

export const matchEvent = new MatchEvent();