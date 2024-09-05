import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Settings } from '@/shared/types/settings.type';
import { Event } from '../event';

class SettingsUpdateEvent extends Event {
  handle(data: Settings) {
    const { setSettings } = getLobbyStoreMethods();
    setSettings(data);
  }

  update(settings: Settings) {
    const { setSettings } = getLobbyStoreMethods();
    setSettings(settings);
    this.emit('settingsUpdate', settings);
  }
}

export const settingsUpdateEvent = new SettingsUpdateEvent();
