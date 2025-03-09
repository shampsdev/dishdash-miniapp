import { create } from 'zustand';
import { Settings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { Tag } from '@/shared/interfaces/tag.interface';

interface SettingsProps {
  settings: Settings;
  tags: Tag[];
  ready: boolean;
}

interface SettingsActions {
  setSettings: (settings: Settings) => void;
  setTags: (tags: Tag[]) => void;
  resetStore: () => void;
  setReady: (ready: boolean) => void;
}

const initialState: SettingsProps = {
  settings: {
    type: 'classicPlaces'
  },
  tags: [],
  ready: false
};

export const useSettingsStore = create<SettingsProps & SettingsActions>(
  (set) => ({
    ...initialState,
    setSettings: (settings: Settings) => set({ settings }),
    setTags: (tags: Tag[]) => set({ tags }),
    resetStore: () => set(initialState),
    setReady: (ready) => set({ ready })
  })
);

export function getSettingsStoreMethods() {
  const { setSettings, resetStore, setReady } = useSettingsStore.getState();
  return {
    setSettings,
    resetStore,
    setReady
  };
}
