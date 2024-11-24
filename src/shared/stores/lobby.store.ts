import { create } from 'zustand';
import { Card } from '@/shared/types/card.interface';
import { User } from '@/shared/types/user.interface';
import { Settings } from '@/shared/types/settings.interface';
import { Tag } from '@/shared/types/tag.interface';

export type GameState = 'settings' | 'match' | 'swiping' | 'finished' | 'error' | 'lobby';

type LobbyActions = {
    setCards: (cards: Card[]) => void;
    setLobbyId: (lobbyId: string) => void;
    addUser: (user: User) => void;
    removeUser: (userId: string) => void;
    setUsers: (users: User[]) => void;
    setTags: (tags: Tag[]) => void;
    updateSettings: (settings: Partial<Settings>) => void;
    setSettings: (settings: Settings) => void;
    setState: (state: GameState) => void;
    resetStore: () => void;

}

type LobbyProps = {
    lobbyId: string | null;
    cards: Card[];
    users: User[];
    settings: Settings;
    state: GameState;
    tags: Tag[];
};

const initialState : LobbyProps = {
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
    state: 'lobby',
    tags: [],
};

export const useLobbyStore = create<LobbyProps & LobbyActions>((set) => ({
    ...initialState,
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
    resetStore: () => {
        return set(initialState);
    }
}));

export function getLobbyStoreMethods() {
    const { setCards, users, cards, addUser, removeUser, setSettings, setState, state } =
        useLobbyStore.getState();
    return { setCards, users, cards, addUser, removeUser, setSettings, setState, state };
}
