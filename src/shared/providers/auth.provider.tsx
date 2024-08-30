import React, { createContext, ReactNode } from 'react';
import { createAuthStore, AuthState } from '@/shared/stores/auth.store';
import { useCloudStorage } from '@vkruglikov/react-telegram-web-app';
import { UseBoundStore, StoreApi, Mutate } from 'zustand';

export const AuthContext = createContext<UseBoundStore<
  Mutate<StoreApi<AuthState>, []>
> | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { getItem, setItem } = useCloudStorage();
  const store = createAuthStore(getItem, setItem);

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
