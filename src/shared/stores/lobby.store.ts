import { create } from 'zustand';
import { Card } from '@/shared/types/game.type';
import { User } from '@/shared/types/user.type';
import { Settings } from '@/shared/types/settings.type';
import { Tag } from '@/shared/types/tag.type';

export type GameState = 'settings' | 'match' | 'swipes' | 'result';

type LobbyProps = {
  lobbyId: string | undefined;
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
  lobbyId: undefined,
  cards: [],
  settings: {
    priceMin: 0,
    priceMax: 10000,
    maxDistance: 10000,
    tags: [],
  },
  users: [],
  state: 'settings',
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
