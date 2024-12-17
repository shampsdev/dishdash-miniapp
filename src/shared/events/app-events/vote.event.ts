import { Event } from '../event';
import { Vote } from '@/shared/types/vote.interface';

export abstract class VoteEvent extends Event {
  handle(data: Vote) {
    console.log(data);
  }

  protected vote(voteId: number, optionId: number) {
    this.emit('vote', { voteId, optionId });
  }
}