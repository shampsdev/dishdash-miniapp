import { Route, Routes } from 'react-router-dom';
import LobbySettingsPage from '@/pages/lobby-settings.page';
import ResultPage from '@/pages/result.page';
import GamePage from '@/pages/game.page';

import { useEffect } from 'react';
import { cardEvent } from '../events/app-events/card.event';
import { finishEvent } from '../events/app-events/finish.event';
import { matchEvent } from '../events/app-events/match.event';
import { releaseMatchEvent } from '../events/app-events/release-match.event';
import { settingsUpdateEvent } from '../events/app-events/settings.event';
import { swipesEvent } from '../events/app-events/swipes.event';
import { userEvents } from '../events/app-events/user.event';
import { useSocket } from '../hooks/useSocket';
import MatchCard from '@/modules/game/match';
import GameCards from '@/modules/game/swipes';
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';
import useTheme from '../hooks/useTheme';

const AppRoutes = () => {
  const { subscribe, socket } = useSocket();
  const params = useThemeParams();

  console.log(params[1]);

  useTheme(params[1]);

  // не вижу смысла выносить в отдельный компонент-обертку 1 useEffect, да, конечно он тут не то чтобы к месту, но и так роуты пустые
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

  return (
    <Routes>
      <Route path="/:id" element={<GamePage />}>
        <Route path="match" element={<MatchCard />} />
        <Route path="settings" element={<LobbySettingsPage />} />
        <Route path="swipes" element={<GameCards />} />
        <Route path="result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
