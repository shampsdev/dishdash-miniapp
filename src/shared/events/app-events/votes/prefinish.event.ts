import { VoteEvent } from '../vote.event';
import { Vote } from '@/shared/types/vote.interface';

class PrefinishEvent extends VoteEvent {
  handle(data: Vote) {
    if (data.type != 'finish') return;
    console.log(data);
  }

  finish() {
    this.vote(0, 2);
  }
}

export const prefinishEvent = new PrefinishEvent();
