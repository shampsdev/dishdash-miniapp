import { useEffect, useState } from 'react';
import { getGame } from './api/games.api';
import { getUser } from './api/user.api';
import Game from './pages/game';
import GameProvider from './store/gameContext';
import UserProvider from './store/userContext';
import { Game as GameType } from './types/game.type';
import { MainPage } from './pages/main.page';
import { Route, Routes } from 'react-router-dom';
import { User } from './types/user.type';
import LobbySettingsPage from './pages/lobby-settings.page';
// import io from "@/"

// export const socket = io("localhost:8000");

// const App = () => {
//   const [msgs, setMsgs] = useState();
//   const socket = useRef<any>(null);

//   useEffect(() => {
//     socket.current = io("https://dishdash.ru");

//     socket.current.on("connect_error", (err) => {
//       console.log(err)
//     })

//     socket.current.on("card", (msg: string) => {
//       console.log(msg)
//       setMsgs(msg);
//     });

//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, []);

//   const handleClick = () => {
//     if (socket.current) {
//       const msg = {
//        "lobbyID": 1
//       }

//       socket.current.emit("joinLobby", JSON.stringify(msg));
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => handleClick()}>Send Message</button>
//       {/* { msgs } */}
//     </div>
//   );
// }

// const App = () => {
//   const [msgs, setMsgs] = useState();
//   const { socket, subscribeToEvent } = useSocket();

//   useEffect(() => {
//     const unsubscribe = subscribeToEvent("card", (msg: any) => {
//       console.log(msg)

//       setMsgs(msg);
//     });

//     // Cleanup subscription on component unmount
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [subscribeToEvent]);

//   const handleClick = () => {
//     if (socket) {
//       const message = { lobbyID: 1 };
//       socket.emit("joinLobby", message);
//     }
//   };

//   return (
//     <div>
//       <button className="bg-gray-200" onClick={handleClick}>Send Message</button>
//       { msgs }
//     </div>
//   );
// };

function App() {
  const [user, setUser] = useState<User>({
    score: 1,
    previousScore: 1,
  });
  const [game, setGame] = useState<GameType>({
    id: 1,
    cards: [],
  });

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      const game = await getGame(0);
      setUser(user);
      setGame(game);
    }
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Routes>
        <Route path="/settings" element={<LobbySettingsPage />}></Route>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/lobby"
          element={
            <div className="w-full">
              <UserProvider user={user}>
                <GameProvider game={game}>
                  <Game />
                </GameProvider>
              </UserProvider>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
