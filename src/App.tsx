import Game from './pages/game.hoc';
import { MainPage } from './pages/main.page';
import { Route, Routes } from 'react-router-dom';
import { SwipeProvider } from './shared/providers/swipe.provider';
import { SocketProvider } from './shared/providers/socket.provider';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { AuthProvider } from './shared/providers/auth.provider';

function App() {
  return (
    <WebAppProvider>
      <AuthProvider>
        <SocketProvider>
          <SwipeProvider>
            <div className="">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:id" element={<Game />} />
              </Routes>
            </div>
          </SwipeProvider>
        </SocketProvider>
      </AuthProvider>
    </WebAppProvider>
  );
}

export default App;
