import React, { useEffect } from 'react';
import { cardEvent } from '../events/app-events/card.event';
import { matchEvent } from '../events/app-events/match.event';
import { settingsUpdateEvent } from '../events/app-events/settings.event';
import { swipesEvent } from '../events/app-events/swipes.event';
import { releaseMatchEvent } from '../events/app-events/release-match.event';
import { finishEvent } from '../events/app-events/finish.event';
import { userEvents } from '../events/app-events/user.event';
import { useSocket } from '../hooks/useSocket';

interface SwipeProviderProps {
  children?: React.ReactNode;
}

export const SwipeProvider = ({ children }: SwipeProviderProps) => {
  const { subscribe, socket } = useSocket();

  useEffect(() => {
    subscribe('card', (data) => cardEvent.handle(data));
    subscribe('match', (data) => matchEvent.handle(data));
    subscribe('userJoined', (data) => userEvents.userJoin(data));
    subscribe('userLeft', (data) => userEvents.userLeft(data));
    subscribe('settingsUpdate', (data) => settingsUpdateEvent.handle(data));
    subscribe('startSwipes', () => swipesEvent.handle());
    subscribe('releaseMatch', () => releaseMatchEvent.handle());
    subscribe('finish', (data) => finishEvent.handle(data));
  }, [socket]);

  return <>{children}</>;
};
