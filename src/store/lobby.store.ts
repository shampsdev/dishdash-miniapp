import { create } from 'zustand';
import { Card } from '@/types/game.type';
import { Settings } from '@/shared/interfaces/settings.interface';
import { Tag } from '@/shared/interfaces/tag.interface';
import axios from 'axios';

const API_URL = 'https://dishdash.ru/';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type LobbyProps = {
  lobbyId: string;
  cards: Card[];
  users: User[];
  settings: Settings;
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
  addUser: (user: User) => void;
  setUsers: (users: User[]) => void;
  fetchTags: () => Promise<void>;
  updateSettings: (settings: Partial<Settings>) => void;
  setSettings: (settings: Settings) => void;
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
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
  setSettings: (settings) => set({ settings }),
  addUser: (newUser: User) => {
    set((state) => ({
      users: [...state.users, newUser],
    }));
    console.log(`User ${newUser.name} added successfully.`);
  },
  setUsers: (users) => set({ users }),
  fetchTags: async () => {
    try {
      const response = await axios.get<Tag[]>(`${API_URL}api/v1/cards/tags`);
      if (response.status !== 200) throw new Error('Failed to fetch tags');
      const data = response.data;
      
      console.log('Fetched tags data:', data);
  
      set((state) => ({
        settings: {
          ...state.settings,
          tags: data,
        },
      }));
  
      console.log('Fetched tags:', data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),
}));
