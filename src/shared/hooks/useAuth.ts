import { useContext } from 'react';
import { AuthContext } from '@/shared/providers/auth.provider';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { ready, user, createUser, logoutUser, addRecentLobby, recentLobbies } = context;

    return { ready, user, createUser, logoutUser, addRecentLobby, recentLobbies };
};
