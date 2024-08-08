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
  const { settings, setSettings, lobbyId, addUser } = useLobbyStore();
  const { user, authenticated } = useAuth();
  const avatars = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];
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
      const avatar = avatars[Number(user.avatar)] || '😃';

      addUser({ ...user, avatar });
      toast.success(`Пользователь ${user.name} присоединился`, {
        icon: avatar,
      });
    };

    const handleSettingsUpdate = (updatedSettings: Settings) => {
      console.log('Received settingsUpdate:', updatedSettings);
      setSettings(updatedSettings);
    };

    const unsubscribeUserJoined = subscribe('userJoined', handleUserJoined);
    const unsubscribeSettingsUpdate = subscribe(
      'settingsUpdate',
      handleSettingsUpdate,
    );

    return () => {
      // сlean up subscriptions
      unsubscribeUserJoined();
      unsubscribeSettingsUpdate();
    };
  }, [subscribe, emit, addUser, setSettings, avatars]);

  return (
    <SettingsContext.Provider
      value={{ joinLobby, updateSettings, startSwipes }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
