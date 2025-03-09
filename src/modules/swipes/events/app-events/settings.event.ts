import { Event } from '../event';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';
import {
  isClassicPlaces,
  isCollectionPlaces,
  Settings
} from '@/modules/swipes/interfaces/settings/settings.interface';
import { getSettingsStoreMethods } from '@/modules/swipes/settings/settings.store';

class SettingsUpdateEvent extends Event {
  handle(data: Settings) {
    const { setSettings, setReady } = getSettingsStoreMethods();
    setSettings(data);

    // Maybe we can do this in some OOP way... like an isReady() function???

    if (isClassicPlaces(data)) {
      if (data.classicPlaces.tags.length > 0) {
        setReady(true);
      } else {
        setReady(false);
      }
    }

    if (isCollectionPlaces(data)) setReady(true);

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
