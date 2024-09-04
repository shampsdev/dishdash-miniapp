import { User } from '@/shared/types/user.type';
import toast from 'react-hot-toast';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { Event } from '../event';
import { useAuth } from '@/shared/hooks/useAuth';

class UserEvents extends Event {
  userJoin(data: User) {
    const { addUser } = useLobbyStore();
    toast.success(`Пользователь ${data.name} присоединился`);
    addUser({ ...data });
  }

  userLeft(data: User) {
    const { removeUser } = useLobbyStore();
    toast.error(`Пользователь ${data.name} вышел`);
    removeUser(data.id);
  }

  joinLobby(lobbyId: string) {
    const { user, authenticated } = useAuth();

    if (authenticated) {
      this.emit('joinLobby', { userId: user?.id, lobbyId });
    } else {
      console.error('user is not authenticated');
    }
  }

  handle(data: any): void {}
}

export const userEvents = new UserEvents();
