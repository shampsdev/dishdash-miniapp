import { User } from './user.interface';

export interface UserVote {
  voteId: number;
  optionId: number;
  user: User;
}
