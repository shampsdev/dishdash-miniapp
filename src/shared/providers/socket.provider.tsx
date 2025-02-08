import React, { useEffect } from 'react';
import { socket } from '../instance/socket.instance';

interface ContextProps {
  subscribe: (
    event: string,
    callback: (...args: any[]) => void,
    signal?: AbortSignal
  ) => () => void;
  emit: (event: string, ...args: any[]) => void;
  socket: typeof socket | null;
}

export const SocketContext = React.createContext<ContextProps>({
  subscribe: () => () => {},
  emit: () => {},
  socket: null
});

interface SocketProviderProps {
  children?: JSX.Element;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  useEffect(() => {
    console.info(socket.connected ? 'socket connected' : 'socket disconnected');
  }, [socket]);

  const subscribe = (
    event: string,
    callback: (...args: any[]) => void,
    signal?: AbortSignal
  ) => {
    if (signal?.aborted) {
      return () => {};
    }

    socket.on(event, callback);

    const unsubscribe = () => {
      socket.off(event, callback);
      signal?.removeEventListener('abort', unsubscribe);
    };

    if (signal) {
      signal.addEventListener('abort', unsubscribe, { once: true });
    }

    return unsubscribe;
  };

  const emit = (event: string, data: any) => {
    console.log(event, data);
    socket.emit(event, data);
  };

  return (
    <SocketContext.Provider
      value={{
        emit,
        subscribe,
        socket
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
