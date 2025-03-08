import { Settings, SettingsType } from './settings/settings.interface';
import { User } from '../../../shared/interfaces/user.interface';

export interface Lobby {
  id: string;
  createdAt: string;
  type: SettingsType;
  settings: Settings;
  users: User[];
}
