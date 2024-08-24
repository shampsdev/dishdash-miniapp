import { create, Mutate, StateCreator, StoreApi, UseBoundStore } from 'zustand';
import axios from 'axios';
import { User } from '@/types/user.type';
import { API_URL } from '@/shared/constants';

export type AuthState = {
  authenticated: boolean;
  user?: User;
  loginUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUser: (user: Omit<User, 'createdAt'>) => Promise<void>;
};

const createAuthState: (
  getItem: any,
  setItem: any,
) => StateCreator<AuthState> = (getItem, setItem) => (set, get) => {
  const rehydrate = async () => {
    try {
      const storedState: AuthState = JSON.parse(await getItem('auth'));
      if (storedState.user != undefined) {
        const res = await axios.get<User>(
          `${API_URL}/api/v1/users/${storedState.user.id}`,
        );
        if (res.status != 200) throw Error('Stored user not found.');
      }

      set(storedState);
    } catch {
      const newState = {
        ...get(),
        user: null,
      };
      set(newState);
    }
  };

  rehydrate();

  return {
    authenticated: false,
    user: undefined,
    loginUser: async (user) => {
      try {
        const res = await axios.post<User>(`${API_URL}/api/v1/users`, user);
        const newState = {
          authenticated: true,
          user: res.data,
        };
        set(newState);
        await setItem('auth', JSON.stringify(newState));
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logoutUser: async () => {
      const newState = {
        authenticated: false,
        user: undefined,
      };
      set(newState);
      await setItem('auth', JSON.stringify(newState));
    },
    updateUser: async (userData: Omit<User, 'createdAt'>) => {
      try {
        const res = await axios.put<User>(`${API_URL}/api/v1/users`, userData, {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        });
        const newState = {
          ...get(),
          user: res.data,
        };
        set(newState);
        await setItem('auth', JSON.stringify(newState));
      } catch (error) {
        console.error('Update failed:', error);
      }
    },
  };
};

export const createAuthStore = (
  getItem: any,
  setItem: any,
): UseBoundStore<Mutate<StoreApi<AuthState>, []>> =>
  create<AuthState>(createAuthState(getItem, setItem));
