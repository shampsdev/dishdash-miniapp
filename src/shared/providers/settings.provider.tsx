import React, { useContext, useEffect } from 'react';
import { useSocket } from './socket.provider';
import toast from 'react-hot-toast';
import { useLobbyStore } from '@/store/lobby.store';
import { User } from '@/types/user.type';

interface ContextProps {
  joinLobby: (lobbyId: string) => void;
  updateSettings: (settings: { priceMin: number; maxDistance: number }) => void;
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
  const { setPrice, setRadius, addUser, lobbyId, setLobbyId } = useLobbyStore();

  const joinLobby = (lobbyId: string) => {
    emit('joinLobby', {
      lobbyId,
      userId: 'your-user-id',
    });
    setLobbyId(lobbyId);
  };

  const updateSettings = (settings: {
    priceMin: number;
    maxDistance: number;
  }) => {
    emit('settingsUpdate', {
      ...settings,
      lobbyId,
    });
  };

  const startGame = () => {
    emit('startSwipes');
  };

  useEffect(() => {
    subscribe('userJoined', (user: User) => {
      toast.success(`Пользователь ${user.name} присоединился`);
      addUser(user);
    });

    subscribe('settingsUpdate', (data: any) => {
      if (data.lobbyId === lobbyId) {
        console.log('Received settingsUpdate:', data);
        setPrice(data.priceMin);
        setRadius(data.maxDistance);
      }
    });

    subscribe('startSwipes', () => {
      toast.success('Игра начинается!');
      console.log('Game started!');
    });
  }, [subscribe, lobbyId, setPrice, setRadius, addUser]);

  return (
    <SettingsContext.Provider value={{ joinLobby, updateSettings, startGame }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
