import { useContext } from 'react';
import { SocketContext } from '../providers/socket.provider';

export const useSocket = () => {
  return useContext(SocketContext);
};
