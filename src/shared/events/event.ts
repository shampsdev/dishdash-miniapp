import { useSocket } from '../providers/socket.provider';

export abstract class Event {
  protected socket = useSocket();

  protected emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  abstract handle(data: any): void;
}
