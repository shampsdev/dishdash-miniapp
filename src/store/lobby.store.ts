import { create } from 'zustand';
import { Card } from '@/types/game.type';
import { Settings } from '@/shared/interfaces/settings.interface';
import { User } from '@/types/user.type';

export type GameState = 'settings' | 'match' | 'swipes';

type LobbyProps = {
  lobbyId: string;
  cards: Card[];
  users: User[];
  settings: Settings;
  state: GameState;
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  setUsers: (users: User[]) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setSettings: (settings: Settings) => void;
  setState: (state: GameState) => void;
};

export const useLobbyStore = create<LobbyProps>((set) => ({
  lobbyId: '',
  cards: [],
  settings: {
    priceMin: 0,
    priceMax: 10000,
    maxDistance: 10000,
    tags: [],
  },
  users: [],
  state: 'settings',
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
  setSettings: (settings) => set({ settings }),
  addUser: (newUser: User) => {
    set((state) => ({
      users: [...state.users, newUser],
    }));
    console.log(`User ${newUser.name} added successfully.`);
  },
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  setUsers: (users) => set({ users }),
  setState: (state) => set({ state }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),
}));
