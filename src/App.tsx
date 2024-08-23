import Game from './pages/game.hoc';
import { MainPage } from './pages/main.page';
import { Route, Routes } from 'react-router-dom';
import LobbySettingsPage from './pages/lobby-settings.page';
import { SwipeProvider } from './shared/providers/swipe.provider';
import { SocketProvider } from './shared/providers/socket.provider';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { AuthProvider } from './shared/providers/auth.provider';
import { SettingsProvider } from './shared/providers/settings.provider';

function App() {
  return (
    <WebAppProvider>
      <AuthProvider>
        <SocketProvider>
          <SwipeProvider>
            <SettingsProvider>
              <div className="">
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/:id" element={<Game />} />
                </Routes>
              </div>
            </SettingsProvider>
          </SwipeProvider>
        </SocketProvider>
      </AuthProvider>
    </WebAppProvider>
  );
}

export default App;
