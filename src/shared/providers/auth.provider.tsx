import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCloudStorage } from '@vkruglikov/react-telegram-web-app';
import { User } from '@/shared/types/user.type';
import { createUser } from '../api/auth.api';

export interface AuthState {
  user: User | null;
  ready: boolean;
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { getItem, setItem } = useCloudStorage();

  const [store, setStore] = useState<AuthState>({
    user: null,
    ready: false,
    createUser: async (user) => {
      const newUser = await createUser(user);
      if (newUser !== null) {
        console.error('A problem ocurred when generating a user.');
      }

      const newState = { ...store, user: newUser ?? null };
      setStore(newState);
    },
    logoutUser: async () => {
      const newState = { ...store, user: null };
      setStore(newState);
    },
  });

  useEffect(() => {
    setItem('auth', JSON.stringify(store));
  }, [store]);

  const isRehydrated = useRef(false);

  useEffect(() => {
    const rehydrate = async () => {
      const storedState: AuthState | null = JSON.parse(
        await getItem('auth'),
      ).catch(() => {
        console.error('Error parsing stored state');
        return null;
      });

      setStore((prevStore) => ({
        ...prevStore,
        user: storedState?.user ?? null,
        ready: true,
      }));
    };

    if (!isRehydrated.current) {
      rehydrate();
      isRehydrated.current = true;
    }
  }, [getItem]);

  return (
    <AuthContext.Provider value={{ ...store }}>{children}</AuthContext.Provider>
  );
};
