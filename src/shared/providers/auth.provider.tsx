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

export type AuthState = {
  user?: User;
  ready: boolean;
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logoutUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { getItem, setItem } = useCloudStorage();

  const [store, setStore] = useState<AuthState>({
    user: undefined,
    ready: false,
    createUser: async (user) => {
      const newUser = await createUser(user);

      if (newUser !== undefined) {
        const newState = { ...store, user: newUser };
        setStore(newState);
      } else {
        console.error('A problem ocurred when generating a user.');
      }
    },
    logoutUser: async () => {
      const newState = { ...store, user: undefined };
      setStore(newState);
    },
  });

  useEffect(() => {
    setItem('auth', JSON.stringify(store));
  }, [store]);

  const isRehydrated = useRef(false);

  useEffect(() => {
    const rehydrate = async () => {
      try {
        const storedState: AuthState = JSON.parse(await getItem('auth'));
        if (storedState !== undefined) {
          setStore((prevStore) => ({
            ...prevStore,
            user: storedState.user,
            ready: true,
          }));
        } else {
          setStore((prevStore) => ({
            ...prevStore,
            user: undefined,
            ready: true,
          }));
        }
      } catch (error) {
        console.error('Error parsing stored state:', error);
        setStore((prevStore) => ({
          ...prevStore,
          user: undefined,
          ready: true,
        }));
      }
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
