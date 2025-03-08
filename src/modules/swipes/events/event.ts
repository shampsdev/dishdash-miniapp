import { socket } from '@/shared/instance/socket.instance';

export abstract class Event {
  protected sock = socket;

  protected emit(event: string, data?: any) {
    console.info(`[socket] > ${event}`, data);
    this.sock.emit(event, data);
  }

  abstract handle(data: any): void;
}
