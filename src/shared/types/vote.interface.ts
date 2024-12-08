import { User } from './user.interface';

export interface Vote {
  id: number;
  option: number;
  User: User;
}
