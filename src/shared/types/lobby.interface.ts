import { GameState } from '../stores/lobby.store';
import { Settings, SettingsType } from './settings/settings.interface';
import { User } from './user.interface';

export interface Lobby {
  id: string;
  state: GameState;
  createdAt: string;
  type: SettingsType;
  settings: Settings;
  users: User[];
}
