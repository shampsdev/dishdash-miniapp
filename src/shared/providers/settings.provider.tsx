import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import toast from 'react-hot-toast';
import { useLobbyStore } from '@/store/lobby.store';
import { useAuth } from '@/shared/hooks/useAuth';
import { User } from '@/types/user.type';

interface ContextProps {
  joinLobby: (lobbyId: string) => void;
  updateSettings: (settings: {
    priceMin: number;
    maxDistance: number;
    tags: number[];
  }) => void;
  startGame: () => void;
}

export const SettingsContext = React.createContext<ContextProps>({
  joinLobby: () => {},
  updateSettings: () => {},
  startGame: () => {},
});

interface SettingsProviderProps {
  children?: React.ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { subscribe, emit } = useSocket();
  const { setPrice, setRadius, setTags, lobbyId, setLobbyId, addUser } =
    useLobbyStore();
  const { user } = useAuth();

  const joinLobby = (lobbyId: string) => {
    if (!lobbyId) {
      console.error('Lobby ID is not defined!');
      return;
    }

    emit('joinLobby', {
      lobbyId,
      userId: user?.id,
    });

    setLobbyId(lobbyId);

    console.log('Joining lobby with ID:', lobbyId);
  };

  const updateSettings = (settings: {
    priceMin: number;
    maxDistance: number;
    tags: number[];
  }) => {
    if (!lobbyId) {
      console.error('Lobby ID is not defined!');
      return;
    }

    emit('settingsUpdate', {
      ...settings,
      lobbyId,
      userId: user?.id,
    });

    console.log('Emitting settingsUpdate:', {
      ...settings,
      lobbyId,
      userId: user?.id,
    });
  };

  const startGame = () => {
    emit('startSwipes', {
      lobbyId,
      userId: user?.id,
    });
  };

  useEffect(() => {
    subscribe('userJoined', (user: User) => {
      toast.success(`User ${user.name} joined`);
      addUser(user);
    });

    subscribe('settingsUpdate', (data: any) => {
      if (data.lobbyId === lobbyId) {
        console.log('Received settingsUpdate:', data);
        setPrice(data.priceMin);
        setRadius(data.maxDistance);
        setTags(data.tags);
        toast.success('Settings updated!');
      } else {
        console.warn(
          'Received settingsUpdate for a different lobby:',
          data.lobbyId,
        );
      }
    });
  }, [subscribe, lobbyId, setPrice, setRadius, setTags, addUser]);

  return (
    <SettingsContext.Provider value={{ joinLobby, updateSettings, startGame }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
