import axios from 'axios';
import { API_URL } from '../constants';
import { Lobby } from '../../modules/swipes/interfaces/lobby.interface';
import { Settings } from '../../modules/swipes/interfaces/settings/settings.interface';

export const fetchLobby = async (id: string): Promise<Lobby | undefined> => {
  try {
    const response = await axios.get<Lobby>(`${API_URL}/api/v1/lobbies/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching lobby:', err);
    return undefined;
  }
};

export const postLobby = async (
  settings: Settings
): Promise<Lobby | undefined> => {
  try {
    const response = await axios.post<Lobby>(
      `${API_URL}/api/v1/lobbies`,
      settings
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching lobby:', err);
    return undefined;
  }
};
