// settings.provider.tsx
import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import toast from 'react-hot-toast';
import { useLobbyStore } from '@/store/lobby.store';
import { useAuth } from '@/shared/hooks/useAuth';
import { User } from '@/types/user.type';
import { Settings } from '@/shared/interfaces/settings.interface';
import { useSwipes } from './swipe.provider';

interface ContextProps {
  joinLobby: (lobbyId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  startSwipes: () => void;
}

export const SettingsContext = React.createContext<ContextProps>({
  joinLobby: () => {},
  updateSettings: () => {},
  startSwipes: () => {},
});

interface SettingsProviderProps {
  children?: React.ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { subscribe, emit } = useSocket();
  const { settings, setSettings, lobbyId, addUser, removeUser } =
    useLobbyStore();
  const { user, authenticated } = useAuth();
  const { startSwipes } = useSwipes();

  const joinLobby = (lobbyId: string) => {
    if (authenticated && user) {
      emit('joinLobby', {
        userId: user.id,
        lobbyId: lobbyId,
      });
      console.log(`User ${user.id} joined lobby ${lobbyId}`);
    }
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    if (lobbyId) {
      emit('settingsUpdate', {
        ...newSettings,
        lobbyId,
        userId: user?.id,
      });
      console.log('Emitting settingsUpdate:', {
        ...newSettings,
        lobbyId,
        userId: user?.id,
      });

      setSettings({
        ...settings,
        ...newSettings,
      });
    } else {
      console.error('Lobby ID is not defined!');
    }
  };

  useEffect(() => {
    const handleUserJoined = (user: User) => {
      console.log('User joined:', user);

      addUser({ ...user });
      toast.success(`Пользователь ${user.name} присоединился`);
    };

    const handleSettingsUpdate = (updatedSettings: Settings) => {
      console.log('Received settingsUpdate:', updatedSettings);
      setSettings(updatedSettings);
    };

    const handleUserLeft = (user: User) => {
      console.log('User left: ', user);
      removeUser(user.id);
      toast.error(`Пользователь ${user.name} вышел`);
    };

    const unsubscribeUserJoined = subscribe('userJoined', handleUserJoined);
    const unsubscribeSettingsUpdate = subscribe(
      'settingsUpdate',
      handleSettingsUpdate,
    );
    const unsubscribeUserLeft = subscribe('userLeft', handleUserLeft);

    return () => {
      // сlean up subscriptions
      unsubscribeUserJoined();
      unsubscribeSettingsUpdate();
      unsubscribeUserLeft();
    };
  }, [subscribe, emit, addUser, setSettings]);

  return (
    <SettingsContext.Provider
      value={{ joinLobby, updateSettings, startSwipes }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
