import React from 'react';
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_URL } from '@/shared/constants';

interface Socket {
  on(event: string, callback: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): this;
  disconnect(): this;
}

interface ContextProps {
  subscribe: (event: string, callback: (...args: any[]) => void) => () => void;
  emit: (event: string, ...args: any[]) => void;
  socket: Socket | null;
}

export const SocketContext = React.createContext<ContextProps>({
  subscribe: () => () => {},
  emit: () => {},
  socket: null,
});

interface SocketProviderProps {
  children?: JSX.Element;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(API_URL ?? '', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    setSocket(newSocket);
    console.info('socket connected');

    return () => {
      console.info('socket disconnected');
      newSocket.disconnect();
    };
  }, []);

  const subscribe = (event: string, callback: (...args: any[]) => void) => {
    socket?.on(event, callback);

    // unsubscribe function
    return () => {
      socket?.off(event, callback);
    };
  };

  const emit = (event: string, data: any) => {
    console.log(event, data);
    socket?.emit(event, JSON.stringify(data));
  };

  return (
    <SocketContext.Provider
      value={{
        emit,
        subscribe,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
