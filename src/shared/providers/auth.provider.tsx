import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from '@/shared/interfaces/user.interface';
import { createUser, getUser } from '../api/auth.api';
import { cloudStorage, initData } from '@telegram-apps/sdk-react';

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
    await cloudStorage.setItem('auth', '');
  };

  useEffect(() => {
    cloudStorage.getItem('auth').then(async (storedData) => {
      let storedState = storedData ? JSON.parse(storedData.auth) : null;
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
    const user = initData.user();
    if (
      ready &&
      (store.user === null || store.user.avatar === '') &&
      user !== undefined
    ) {
      if (user)
        updateUser({
          name: user.first_name ?? user.username,
          avatar: user.photo_url ?? '',
          telegram: user.id
        });
    }
  }, [ready, store]);

  useEffect(() => {
    const updateAuth = async () => {
      try {
        await cloudStorage.setItem('auth', JSON.stringify(store));
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
