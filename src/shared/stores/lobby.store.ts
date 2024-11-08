import { create } from 'zustand';
import { Card } from '@/shared/types/card.interface';
import { User } from '@/shared/types/user.interface';
import { Settings } from '@/shared/types/settings.interface';
import { Tag } from '@/shared/types/tag.interface';

export type GameState = 'settings' | 'match' | 'swipes' | 'result' | 'preview';

type LobbyProps = {
  lobbyId: string | null;
  cards: Card[];
  users: User[];
  settings: Settings;
  state: GameState;
  tags: Tag[];
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  setUsers: (users: User[]) => void;
  setTags: (tags: Tag[]) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setSettings: (settings: Settings) => void;
  setState: (state: GameState) => void;
};

export const useLobbyStore = create<LobbyProps>((set) => ({
  lobbyId: null,
  cards: [],
  settings: {
    priceMin: 0,
    priceMax: 10000,
    maxDistance: 10000,
    tags: [],
    location: {
      lat: 0,
      lon: 0,
    },
  },
  users: [],
  state: 'preview',
  tags: [],
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
  setSettings: (settings) => set({ settings }),
  addUser: (newUser: User) => {
    set((state) => ({
      users: [...state.users, newUser],
    }));
  },
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  setUsers: (users) => set({ users }),
  setState: (state) => set({ state }),
  setTags: (tags) => set({ tags }),
  updateSettings: (newSettings) => {
    return set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    }));
  },
}));

export function getLobbyStoreMethods() {
  const { setCards, cards, addUser, removeUser, setSettings, setState } =
    useLobbyStore.getState();
  return { setCards, cards, addUser, removeUser, setSettings, setState };
}
