import { Card } from '@/types/game.type';
import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type LobbyProps = {
  lobbyId: string;
  cards: Card[];
  tags: { id: number; icon: string; name: string }[];
  price: number;
  radius: number;
  users: User[];
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
  setTags: (tags: { id: number; icon: string; name: string }[]) => void;
  setPrice: (price: number) => void;
  setRadius: (radius: number) => void;
  addUser: (user: User) => void;
  fetchTags: () => Promise<void>;
  updateSettings: (settings: { priceMax: number; maxDistance: number }) => void;
};

export const useLobbyStore = create<LobbyProps>((set) => ({
  lobbyId: '',
  cards: [],
  tags: [],
  price: 0,
  radius: 0,
  users: [],
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
  setTags: (tags) => set({ tags }),
  setPrice: (price) => set({ price }),
  setRadius: (radius) => set({ radius }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  fetchTags: async () => {
    try {
      const response = await fetch('https://dishdash.ru/api/v1/cards/tags');
      if (!response.ok) throw new Error('Failed to fetch tags');
      const data = await response.json();
      set({ tags: data });
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  },
  updateSettings: ({ priceMax, maxDistance }) =>
    set(() => ({
      price: priceMax,
      radius: maxDistance,
    })),
}));
