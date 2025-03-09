import { User } from '@/shared/interfaces/user.interface';
import toast from 'react-hot-toast';
import { getLobbyStoreMethods } from '@/modules/swipes/lobby/lobby.store';
import { Event } from '../event';

class UserEvents extends Event {
  userJoin(data: User) {
    const { addUser } = getLobbyStoreMethods();
    toast.success(`Пользователь ${data.name} присоединился`, {
      duration: 1000
    });
    addUser({ ...data });
  }

  userLeft(data: User) {
    const { removeUser } = getLobbyStoreMethods();
    toast.error(`Пользователь ${data.name} вышел`, { duration: 1000 });
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
