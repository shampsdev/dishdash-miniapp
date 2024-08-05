import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { API_URL } from '@/shared/constants';

type EventCallback = (data: any) => void;

const useSocket = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(API_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    socketInstance.on('connect_error', (err: any) => {
      console.error('Connection error:', err);
    });

    socketInstance.on('connect', () => {
      console.log('WebSocket connected successfully');
    });

    socketInstance.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const subscribeToEvent = useCallback(
    (event: string, callback: EventCallback) => {
      if (socket) {
        socket.on(event, callback);
        return () => {
          socket.off(event, callback);
        };
      }
    },
    [socket],
  );

  const emitEvent = useCallback(
    (event: string, data: any) => {
      if (socket) {
        console.log(`Emitting event: ${event} with data:`, data);
        socket.emit(event, data);
      }
    },
    [socket],
  );

  return { socket, subscribeToEvent, emitEvent };
};

export default useSocket;
