import { Event } from '../event';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { Settings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { getSettingsStoreMethods } from '@/modules/swipes/stores/settings.store';

class SettingsUpdateEvent extends Event {
  handle(data: Settings) {
    const { setSettings } = getSettingsStoreMethods();
    setSettings(data);

    const { setIsLoading } = getLoadingStoreMethods();
    setIsLoading(false);
  }

  update(settings: Settings) {
    const { setSettings } = getSettingsStoreMethods();
    setSettings(settings);
    this.emit('settingsUpdate', settings);
  }
}

export const settingsUpdateEvent = new SettingsUpdateEvent();
