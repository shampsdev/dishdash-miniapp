import { Route, Routes } from 'react-router-dom';
import { ResultPage } from '@/pages/swipes/result.page';

import useTheme from './hooks/useTheme';
import { HomePage } from '@/pages/home.page';
import { ErrorPage } from '@/pages/error.page';
import { LobbyPreviewPage } from '@/pages/swipes/lobby.page';
import { SettingsPage } from '@/pages/swipes/settings.page';
import { MapPage } from '@/pages/map.page';

import { VersionLayout } from '@/layouts/version.layout';
import { SwipesLayout } from '@/layouts/swipes.layout';
import { MatchCard } from '@/modules/swipes/components/match.card';
import { LoadingLayout } from '@/layouts/loading.layout';
import { SwipesPage } from '@/pages/swipes/swipes.page';

export const AppRoutes = () => {
  useTheme();

  return (
    <Routes>
      <Route element={<VersionLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/:id" element={<SwipesLayout />}>
          <Route element={<LoadingLayout />}>
            <Route path="match" element={<MatchCard />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="lobby" element={<LobbyPreviewPage />} />
            <Route path="swiping" element={<SwipesPage />} />
            <Route path="results" element={<ResultPage />} />
          </Route>
        </Route>
        <Route path="error" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
