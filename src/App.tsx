import { useEffect } from 'react';
import Game from './pages/game';
import { MainPage } from './pages/main.page';
import { Route, Routes } from 'react-router-dom';
import LobbySettingsPage from './pages/lobby-settings.page';
import { SwipeProvider } from './shared/providers/swipe.provider';
import { SocketProvider } from './shared/providers/socket.provider';

function App() {
  // const [user, setUser] = useState<User>({
  //   score: 1,
  //   previousScore: 1,
  // });
  // const [game, setGame] = useState<GameType>({
  //   id: 1,
  //   cards: [],
  // });

  useEffect(() => {
    // async function fetchData() {
    //   const user = await getUser();
    //   const game = await getGame(0);
    // }
    // fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Routes>
        <Route path="/settings" element={<LobbySettingsPage />}></Route>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/:id"
          element={
            <div className="w-full">
              <SocketProvider>
                <SwipeProvider>
                  <Game />
                </SwipeProvider>
              </SocketProvider>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
