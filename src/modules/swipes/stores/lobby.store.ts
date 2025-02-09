import { create } from 'zustand';
import { User } from '@/shared/interfaces/user.interface';
import { Card } from '../interfaces/card.interface';

export type GameState = 'lobby' | 'swiping';

type LobbyActions = {
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  setUsers: (users: User[]) => void;
  setState: (state: GameState) => void;
  resetStore: () => void;
};

type LobbyProps = {
  lobbyId: string | null;
  cards: Card[];
  users: User[];
  state: GameState;
};

const initialState: LobbyProps = {
  lobbyId: null,
  cards: [],
  users: [],
  state: 'lobby'
};

export const useLobbyStore = create<LobbyProps & LobbyActions>((set) => ({
  ...initialState,
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
  addUser: (newUser: User) => {
    set((state) => ({
      users: [...state.users, newUser]
    }));
  },
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId)
    })),
  setUsers: (users) => set({ users }),
  setState: (state) => set({ state }),
  resetStore: () => {
    return set(initialState);
  }
}));

export function getLobbyStoreMethods() {
  const { setCards, users, cards, addUser, removeUser, setState, state } =
    useLobbyStore.getState();
  return {
    setCards,
    users,
    cards,
    addUser,
    removeUser,
    setState,
    state
  };
}
