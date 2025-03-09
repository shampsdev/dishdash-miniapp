import { Route, Routes, useLocation } from 'react-router-dom';
import { ResultPage } from '@/pages/swipes/result.page';

import useTheme from './hooks/useTheme';
import { HomePage } from '@/pages/home.page';
import { ErrorLayout } from '@/shared/layouts/error.layout';
import { LobbyPage } from '@/pages/swipes/lobby.page';
import { SettingsPage } from '@/pages/swipes/settings.page';
import { MapPage } from '@/pages/map.page';

import { VersionLayout } from '@/shared/layouts/version.layout';
import { SwipesLayout } from '@/shared/layouts/swipes.layout';
import { MatchCard } from '@/modules/swipes/match/match-card';
import { SwipesPage } from '@/pages/swipes/swipes.page';
import { ServerRouteProvider } from './providers/server-route.provider';
import { useEffect } from 'react';
import { LoadingLayout } from '@/shared/layouts/loading.layout';

export const AppRoutes = () => {
  useTheme();

  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Routes>
      <Route element={<VersionLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/:id" element={<SwipesLayout />}>
          <Route path="" element={<ServerRouteProvider />}>
            <Route path="" element={<LoadingLayout />}>
              <Route path="" element={<ErrorLayout />}>
                <Route path="match" element={<MatchCard />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="lobby" element={<LobbyPage />} />
                <Route path="swiping" element={<SwipesPage />} />
                <Route path="results" element={<ResultPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
