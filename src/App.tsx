import Game from './pages/game';
import { MainPage } from './pages/main.page';
import { Route, Routes } from 'react-router-dom';
import LobbySettingsPage from './pages/lobby-settings.page';
import { SwipeProvider } from './shared/providers/swipe.provider';
import { SocketProvider } from './shared/providers/socket.provider';

function App() {
  return (
    <SocketProvider>
      <SwipeProvider>
        <div className="flex items-center justify-center min-h-screen">
          <Routes>
            <Route path="/settings" element={<LobbySettingsPage />}></Route>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/:id"
              element={
                <div className="w-full">
                  <Game />
                </div>
              }
            />
          </Routes>
        </div>
      </SwipeProvider>
    </SocketProvider>
  );
}

export default App;
