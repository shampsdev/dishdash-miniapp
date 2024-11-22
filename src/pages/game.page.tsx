import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { userEvents } from '@/shared/events/app-events/user.event';

import { fetchTags } from "@/shared/api/tags.api"

import { useRoutes } from '@/shared/hooks/useRoutes';
import { GameComponent } from '@/components/ui/game';
import { useSocket } from '@/shared/hooks/useSocket';
import { cardEvent } from '@/shared/events/app-events/card.event';
import { matchEvent } from '@/shared/events/app-events/match.event';
import { settingsUpdateEvent } from '@/shared/events/app-events/settings.event';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { releaseMatchEvent } from '@/shared/events/app-events/release-match.event';
import { finishEvent } from '@/shared/events/app-events/finish.event';
import { errorEvent } from '@/shared/events/app-events/error.event';

export const GamePage = () => {
    const { setLobbyId, lobbyId } = useLobbyStore();
    const { id } = useParams<{ id: string }>(); //lobbyId
    const { user, addRecentLobby, recentLobbies, ready } = useAuth();
    const { socket, subscribe } = useSocket();
    const { setTags } = useLobbyStore();
    useRoutes();

    useEffect(() => {
        fetchTags().then((tags) => {
            if (tags != undefined) setTags(tags);
        });
    }, []);

    useEffect(() => {
        socket?.connect();

        return () => {
            socket?.disconnect();
        }
    }, [socket])

    useEffect(() => {
        const unsubscribes = [
            subscribe('card', (data) => cardEvent.handle(data)),
            subscribe('match', (data) => matchEvent.handle(data)),
            subscribe('userJoined', (data) => userEvents.userJoin(data)),
            subscribe('userLeft', (data) => userEvents.userLeft(data)),
            subscribe('settingsUpdate', (data) => settingsUpdateEvent.handle(data)),
            subscribe('startSwipes', () => swipesEvent.handle()),
            subscribe('releaseMatch', () => releaseMatchEvent.handle()),
            subscribe('finish', (data) => finishEvent.handle(data)),
            subscribe('error', (data) => errorEvent.handle(data)),
        ];

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
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
