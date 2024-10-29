import { SocketProvider } from './shared/providers/socket.provider';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { AuthProvider } from './shared/providers/auth.provider';
import AppRoutes from './shared/routes/routes';
import { API_URL } from './shared/constants';

function App() {
    console.info(API_URL);

    return (
        <WebAppProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRoutes />
                </SocketProvider>
            </AuthProvider>
        </WebAppProvider>
    );
}

export default App;
