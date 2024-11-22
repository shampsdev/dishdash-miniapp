import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { userEvents } from '@/shared/events/app-events/user.event';

import { fetchTags } from "@/shared/api/tags.api"

import { useRoutes } from '@/shared/hooks/useRoutes';
import { GameComponent } from '@/components/ui/game';

export const GamePage = () => {
    const { setLobbyId, lobbyId } = useLobbyStore();
    const { id } = useParams<{ id: string }>(); //lobbyId
    const { user, addRecentLobby, recentLobbies, ready } = useAuth();
    const { setTags } = useLobbyStore();
    useRoutes();


    useEffect(() => {
        fetchTags().then((tags) => {
            if (tags != undefined) setTags(tags);
        });
    }, []);

    useEffect(() => {
        fetchTags().then((tags) => {
            if (tags != undefined) setTags(tags);
        });
    }, []);

    useEffect(() => {
        if (id && !!user && lobbyId === null) {
            setLobbyId(id);
            if (!recentLobbies.includes(id)) {
                addRecentLobby(id);
            }
            userEvents.joinLobby(id, user?.id);
        }
    }, [id, user, ready]);

    return <GameComponent />;
};
