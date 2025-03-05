import { create } from 'zustand';
import { Settings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { Tag } from '@/shared/interfaces/tag.interface';

interface SettingsProps {
  settings: Settings;
  tags: Tag[];
}

interface SettingsActions {
  setSettings: (settings: Settings) => void;
  setTags: (tags: Tag[]) => void;
  resetStore: () => void;
}

const initialState: SettingsProps = {
  settings: {
    type: 'classicPlaces'
  },
  tags: []
};

export const useSettingsStore = create<SettingsProps & SettingsActions>(
  (set) => ({
    ...initialState,
    setSettings: (settings: Settings) => set({ settings }),
    setTags: (tags: Tag[]) => set({ tags }),
    resetStore: () => set(initialState)
  })
);

export function getSettingsStoreMethods() {
  const { setSettings, resetStore } = useSettingsStore.getState();
  return {
    setSettings,
    resetStore
  };
}
