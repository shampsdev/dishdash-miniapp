import { Card } from '@/types/game.type';
import { create } from 'zustand';

type LobbyProps = {
  lobbyId: string;
  cards: Card[];
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
  joinLobby: (lobbyId: string) => void;
};

export const useLobbyStore = create<LobbyProps>((set) => ({
  lobbyId: '',
  users: [],
  cards: [],
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
  joinLobby: (lobbyId) => set({ lobbyId }),
}));