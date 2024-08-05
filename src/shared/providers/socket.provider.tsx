import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_URL } from '@/shared/constants';

interface ContextProps {
  subscribe: (event: string, callback: (...args: any[]) => void) => void;
  emit: (event: string, data: any) => void;
}

export const SocketContext = React.createContext<ContextProps>({
  subscribe: () => {},
  emit: () => {},
});

interface SocketProviderProps {
  children?: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    console.log('Attempting to connect socket...');
    const newSocket = io(API_URL ?? '', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('WebSocket connected successfully');
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const subscribe = (event: string, callback: (...args: any[]) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const emit = (event: string, data: any) => {
    console.log(`Emitting event: ${event}`, data);
    if (socket) {
      socket.emit(event, data);
    }
  };

  return (
    <SocketContext.Provider value={{ emit, subscribe }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
