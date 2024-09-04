import { useLoadingStore } from '@/shared/stores/loading.store';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { useMatchStore } from '@/shared/stores/match.store';
import { Match } from '@/shared/types/game.type';
import { Event } from '../event';

class MatchEvent extends Event {
  handle(data: Match) {
    const { setMatchCard, setMatchId } = useMatchStore();
    const { setIsLoading } = useLoadingStore();
    const { setState } = useLobbyStore();

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
