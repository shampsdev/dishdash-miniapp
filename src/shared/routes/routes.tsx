import { Route, Routes } from 'react-router-dom';
import { ResultPage } from '@/pages/result.page';
import { GamePage } from '@/pages/game.page';

import MatchCard from '@/modules/game/match.card';
import GameCards from '@/modules/game/swipes';
import useTheme from '../hooks/useTheme';
import { HomePage } from '@/pages/home.page';
import { ErrorPage } from '@/pages/error.page';
import { LobbyPreviewPage } from '@/pages/lobby-preview.page';
import { LobbySettingsPage } from '@/pages/lobby-settings.page';
import { MapPage } from '@/pages/map.page';

const AppRoutes = () => {
  useTheme();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/:id" element={<GamePage />}>
        <Route path="match" element={<MatchCard />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="settings" element={<LobbySettingsPage />} />
        <Route path="lobby" element={<LobbyPreviewPage />} />
        <Route path="swiping" element={<GameCards />} />
        <Route path="results" element={<ResultPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
