import React, { useEffect } from 'react';
import { socket } from '../instance/socket.instance';

interface ContextProps {
  subscribe: (
    event: string,
    callback: (...args: any[]) => void,
    signal?: AbortSignal
  ) => () => void;
  emit: (event: string, ...args: any[]) => void;
  socket: typeof socket;
}

export const SocketContext = React.createContext<ContextProps>({
  subscribe: () => () => {},
  emit: () => {},
  socket
});

interface SocketProviderProps {
  children?: JSX.Element;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const subscribe = (
    event: string,
    callback: (...args: any[]) => void,
    signal?: AbortSignal
  ) => {
    if (signal?.aborted) {
      return () => {};
    }

    const loggingCallback = (data: any) => {
      console.info(`[socket] < ${event}`, data);
      callback(data);
    };

    socket.on(event, loggingCallback);

    const unsubscribe = () => {
      socket.off(event, loggingCallback);
      signal?.removeEventListener('abort', unsubscribe);
    };

    signal?.addEventListener('abort', unsubscribe, { once: true });

    return unsubscribe;
  };

  const emit = (event: string, data: any) => {
    console.info(`[socket] > ${event}`, data);
    socket.emit(event, data);
  };

  useEffect(() => {
    const onConnect = () => {
      console.info('[socket] connected');
    };

    const onDisconnect = () => {
      console.info('[socket] disconnected');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

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
