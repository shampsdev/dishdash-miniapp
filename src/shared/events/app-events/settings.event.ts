import { useLobbyStore } from '@/shared/stores/lobby.store';
import { Settings } from '@/shared/types/settings.type';
import { Event } from '../event';

class SettingsUpdateEvent extends Event {
  handle(data: Settings) {
    const { setSettings } = useLobbyStore();
    setSettings(data);
  }
}

export const settingsUpdateEvent = new SettingsUpdateEvent();
