import { create } from 'zustand';
import { Settings } from '../types/settings/settings.interface';
import { Tag } from '../types/tag.interface';

interface SettingsProps {
  settings: Settings;
  tags: Tag[];
}

interface SettingsActions {
  setSettings: (settings: Settings) => void;
  setTags: (tags: Tag[]) => void;
}

export const useSettingsStore = create<SettingsProps & SettingsActions>(
  (set) => ({
    settings: {
      type: 'classicPlaces'
    },
    tags: [],
    setSettings: (settings: Settings) => set({ settings }),
    setTags: (tags: Tag[]) => set({ tags })
  })
);

export function getSettingsStoreMethods() {
  const { setSettings } = useSettingsStore.getState();
  return {
    setSettings
  };
}
