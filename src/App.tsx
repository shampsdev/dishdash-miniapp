import { AuthProvider } from './shared/providers/auth.provider';
import { API_URL } from './shared/constants';
import { SocketProvider } from './shared/providers/socket.provider';
import { AppRoutes } from './shared/routes';

function App() {
  console.info(API_URL);

  return (
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
