import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
  useCloudStorage,
  useInitData
} from '@vkruglikov/react-telegram-web-app';
import { User } from '@/shared/types/user.interface';
import { createUser, getUser } from '../api/auth.api';

export interface AuthState {
  user: User | null;
  recentLobbies: string[];
}

export interface AuthActions {
  logoutUser: () => Promise<void>;
  addRecentLobby: (id: string) => Promise<void>;
}

export const AuthContext = createContext<
  (AuthState & AuthActions & { ready: boolean }) | undefined
>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const initialState = {
  user: null,
  recentLobbies: []
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { getItem, setItem } = useCloudStorage();
  const [initDataUnsafe] = useInitData();

  const [ready, setReady] = useState(false);
  const [store, setStore] = useState<AuthState>(initialState);

  const addRecentLobby = async (id: string) => {
    setStore((prevState) => ({
      ...prevState,
      recentLobbies: [id, ...prevState.recentLobbies]
    }));
  };

  const updateUser = async (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser = await createUser(user);
    if (newUser === null) {
      console.error('A problem ocurred when generating a user.');
      return;
    }

    setStore((prevState) => ({ ...prevState, user: newUser ?? null }));
  };

  const logoutUser = async () => {
    setItem('auth', '');
  };

  useEffect(() => {
    getItem('auth').then(async (storedData) => {
      let storedState = storedData ? JSON.parse(storedData) : null;
      if (storedState !== null && storedState.user !== null) {
        let user = await getUser(storedState.user.id);
        if (user !== null) {
          setStore((prevState) => ({ ...prevState, ...storedState }));
        }
      }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (
      ready &&
      (store.user === null || store.user.avatar === '') &&
      initDataUnsafe?.user !== undefined
    ) {
      updateUser({
        name: initDataUnsafe.user.first_name ?? initDataUnsafe.user.username,
        // @ts-expect-error photo_url is actually string or undefined
        avatar: initDataUnsafe.user?.photo_url ?? '',
        telegram: initDataUnsafe.user.id
      });
    }
  }, [ready, store]);

  useEffect(() => {
    const updateAuth = async () => {
      try {
        await setItem('auth', JSON.stringify(store));
      } catch (error) {
        console.error('Failed to save store:', error);
      }
    };

    updateAuth();
  }, [store]);

  return (
    <AuthContext.Provider
      value={{ ...store, ready, addRecentLobby, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
