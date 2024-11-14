import React, { useEffect } from 'react';
import { socket } from '../instance/socket.instance';

interface ContextProps {
    subscribe: (event: string, callback: (...args: any[]) => void) => () => void;
    emit: (event: string, ...args: any[]) => void;
    socket: typeof socket | null;
}

export const SocketContext = React.createContext<ContextProps>({
    subscribe: () => () => { },
    emit: () => { },
    socket: null,
});

interface SocketProviderProps {
    children?: JSX.Element;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    useEffect(() => {
        console.info('socket connected');
        socket.connect();

        return () => {
            console.info('socket disconnected');
            socket.disconnect();
        };
    }, []);

    const subscribe = (event: string, callback: (...args: any[]) => void) => {
        socket.on(event, callback);

        // unsubscribe function
        return () => {
            socket.off(event, callback);
        };
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
                socket,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
