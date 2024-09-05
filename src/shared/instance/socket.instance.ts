import io from 'socket.io-client';
import { API_URL } from '@/shared/constants';

export const socket = io(API_URL ?? '', {
  transports: ['websocket'],
  reconnectionAttempts: 5,
  timeout: 20000,
});
