declare module 'socket.io-client' {
  import { ManagerOptions, SocketOptions } from "socket.io-client/build/esm";

  interface Socket {
    on(event: string, callback: (...args: any[]) => void): this;
    emit(event: string, ...args: any[]): this;
    disconnect(): this;
  }

  interface SocketStatic {
    (uri: string, opts?: Partial<ManagerOptions & SocketOptions>): Socket;
    (opts: Partial<ManagerOptions & SocketOptions>): Socket;
  }

  const io: SocketStatic;

  export = io;
}
