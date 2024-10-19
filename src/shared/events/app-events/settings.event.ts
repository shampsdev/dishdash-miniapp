import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Settings } from '@/shared/types/settings.interface';
import { Event } from '../event';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';

class SettingsUpdateEvent extends Event {
  handle(data: Settings) {
    const { setSettings } = getLobbyStoreMethods();
    setSettings(data);

    const { setIsLoading } = getLoadingStoreMethods();
    setIsLoading(false);
  }

  update(settings: Settings) {
    const { setSettings } = getLobbyStoreMethods();
    console.log(settings);
    setSettings(settings);
    this.emit('settingsUpdate', settings);
  }
}

export const settingsUpdateEvent = new SettingsUpdateEvent();
