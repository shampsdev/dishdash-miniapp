import React from 'react';
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface ContextProps {
  subscribe: (event: string, callback: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => void;
}

export const SocketContext = React.createContext<ContextProps>({
  subscribe: () => {},
  emit: () => {},
});

interface SocketProviderProps {
  children?: JSX.Element;
}

interface Socket {
  on(event: string, callback: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): this;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const API_URL = 'http://192.168.1.99:8000/' // chianzes

  useEffect(() => {
    const newSocket: Socket = io(API_URL ?? '', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    setSocket(newSocket);

  }, []);

  const subscribe = (event: string, callback: (...args: any[]) => void) => {
    socket?.on(event, callback);
  };

  const emit = (event: string, data: any) => {
    socket?.emit(event, JSON.stringify(data));
  };

  return (
    <SocketContext.Provider
      value={{
        emit,
        subscribe,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
