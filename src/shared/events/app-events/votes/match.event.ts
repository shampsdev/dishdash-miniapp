import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getMatchStoreMethods } from '@/shared/stores/match.store';
import { getVoteStoreMethods } from '@/shared/stores/vote.store';
import { VoteEvent } from '../vote.event';
import { Match } from '@/shared/types/match.interface';

class MatchEvent extends VoteEvent {
  handle(data: Match) {
    if (data.type != 'match') return;
    console.log(data);

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

  handleResult() {
    const { setMatchCard } = getMatchStoreMethods();
    const { setState } = getLobbyStoreMethods();
    setMatchCard({
      id: null,
      card: null
    });
    setState('swiping');
  }

  finish() {
    const { id } = getMatchStoreMethods();
    if (id == null) throw Error('Undefined match id');
    this.vote(id, 0);
  }

  continue() {
    const { id } = getMatchStoreMethods();
    if (id == null) throw Error('Undefined match id');
    this.vote(id, 1);
  }
}

export const matchEvent = new MatchEvent();
