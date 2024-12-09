import axios from 'axios';
import { API_URL } from '../constants';
import { Location } from '../types/location.interface';
import { User } from '../types/user.interface';
import { Tag } from '../types/tag.interface';
import { GameState } from '../stores/lobby.store';

export interface Lobby {
  id: string;
  state: GameState;
  location: Location;
  users: User[];
  createdAt: string;
  tags: Tag[];
}

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
  location: Location
): Promise<Lobby | undefined> => {
  try {
    const response = await axios.post<Lobby>(`${API_URL}/api/v1/lobbies`, {
      location,
      priceAvg: 1200
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching lobby:', err);
    return undefined;
  }
};

export const nearestLobby = async (
  location: Location
): Promise<Lobby | undefined> => {
  try {
    const response = await axios.post<Lobby>(
      `${API_URL}/api/v1/lobbies/nearest`,
      {
        location
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching lobby:', err);
    return undefined;
  }
};

export const findLobby = async (
  location: Location,
  dist: number
): Promise<Lobby | undefined> => {
  try {
    const response = await axios.post<Lobby>(`${API_URL}/api/v1/lobbies/find`, {
      location,
      dist
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching lobby:', err);
    return undefined;
  }
};
