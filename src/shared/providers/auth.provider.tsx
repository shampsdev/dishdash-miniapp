import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from 'react';
import { useCloudStorage, useInitData } from '@vkruglikov/react-telegram-web-app';
import { User } from '@/shared/types/user.interface';
import { createUser } from '../api/auth.api';

export interface AuthState {
    user: User | null;
    recentLobbies: string[];
    logoutUser: () => Promise<void>;
    addRecentLobby: (id: string) => Promise<void>;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { getItem, setItem } = useCloudStorage();
    const [initDataUnsafe] = useInitData();

    const [ready, setReady] = useState(false);
    const [store, setStore] = useState<AuthState>({
        user: null,
        recentLobbies: [],
        addRecentLobby: async (id: string) => {
            setStore((prevState) => ({ ...prevState, recentLobbies: [id, ...prevState.recentLobbies] }));
        },
        logoutUser: async () => {
            const newState = { ...store, user: null };
            setStore(newState);
        },
    });

    const updateUser = async (user: Omit<User, 'id' | 'createdAt'>) => {
        const newUser = await createUser(user);
        if (newUser === null) {
            console.error('A problem ocurred when generating a user.');
        }

        setStore((prevState) => ({ ...prevState, user: newUser ?? null }));
    }

    useEffect(() => {
        getItem('auth').then((storedData) => {
            let storedState = storedData ? JSON.parse(storedData) : null;
            setStore((prevState) => ({ ...prevState, ...storedState }));
            console.log('retreived from stored state', storedState);
            setReady(true);
        });
    }, [])

    useEffect(() => {
        console.log(store, ready);
        if (ready && store.user === null && initDataUnsafe?.user !== undefined) {
            updateUser({
                name: initDataUnsafe.user.username ?? initDataUnsafe.user.first_name,
                avatar: `https://t.me/i/userpic/320/${initDataUnsafe?.user.username}.jpg`,
                telegram: initDataUnsafe.user.id,
            })

            console.log('created user');
        }
    }, [ready, store])


    useEffect(() => {
        const updateAuth = async () => {
            try {
                await setItem('auth', JSON.stringify(store));
            } catch (error) {
                console.error('Failed to save store:', error);
            }
        };

        updateAuth();
    }, [store]);

    return (
        <AuthContext.Provider value={{ ...store }}>{children}</AuthContext.Provider>
    );
};
