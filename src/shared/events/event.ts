import { socket } from '../instance/socket.instance';

export abstract class Event {
  protected sock = socket;

  protected emit(event: string, data?: any) {
    this.sock.emit(event, data);
  }

  abstract handle(data: any): void;
}
