import { Event } from '../event';
import { Vote } from '@/shared/types/vote.interface';
import { getVoteStoreMethods } from '@/shared/stores/vote.store';

class VoteEvent extends Event {
  handle(data: Vote) {
    const { addVote } = getVoteStoreMethods();
    addVote(data);
  }

  vote(id: number, option: number) {
    this.emit('vote', { id, option });
  }
}

export const voteEvent = new VoteEvent();
