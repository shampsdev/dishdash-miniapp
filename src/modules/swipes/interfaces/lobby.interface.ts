import { Settings, SettingsType } from './settings/settings.interface';
import { User } from '../../../shared/interfaces/user.interface';

type GameState = 'lobby' | 'swiping';

export interface Lobby {
  id: string;
  state: GameState;
  createdAt: string;
  type: SettingsType;
  settings: Settings;
  users: User[];
}
