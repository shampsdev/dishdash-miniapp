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

// function App () {
//   const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const sendMessage = () => {
//     console.log("q34j")
//     socket.emit("echo", { message });
//   };

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("echo", room);
//     }
//   };

//   useEffect(() => {
//     socket.on("echo", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);

//   return (
//     <div className="flex flex-col gap-y-12">
//     <input
//       placeholder="Room Number..."
//       onChange={(event) => {
//         setRoom(event.target.value);
//       }}
//     />
//     <button className='bg-blue-400' onClick={joinRoom}> Join Room</button>
//     <input
//       placeholder="Message..."
//       onChange={(event) => {
//         setMessage(event.target.value);
//       }}
//     />
//     <button className='bg-blue-400' onClick={sendMessage}> Send Message</button>
//     <h1> Message:</h1>
//     {messageReceived}
//   </div>
//   );
// }

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
