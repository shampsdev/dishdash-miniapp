import { User } from '@/shared/types/user.interface';
import toast from 'react-hot-toast';
import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Event } from '../event';

class UserEvents extends Event {
  userJoin(data: User) {
    const { addUser } = getLobbyStoreMethods();
    toast.success(`Пользователь ${data.name} присоединился`, {
      className: 'bg-secondary text-foreground rounded-xl w-full',
    });
    addUser({ ...data });
  }

  userLeft(data: User) {
    const { removeUser } = getLobbyStoreMethods();
    toast.error(`Пользователь ${data.name} вышел`, {
      className: 'bg-secondary text-foreground rounded-xl w-full',
    });
    removeUser(data.id);
  }

  joinLobby(lobbyId: string, userId: string | undefined) {
    if (userId) {
      this.emit('joinLobby', { userId, lobbyId });
    } else {
      console.error('user is not authenticated');
    }
  }

  handle(data: any): void {
    console.log(data);
  }
}

export const userEvents = new UserEvents();
