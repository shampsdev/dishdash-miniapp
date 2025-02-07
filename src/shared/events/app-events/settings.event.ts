import { Event } from '../event';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import { getSettingsStoreMethods } from '@/shared/stores/settings.store';
import { Settings } from '@/shared/types/settings/settings.interface';

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
