import axios from 'axios';
import { API_URL } from '../constants';
import { Location } from '../types/location.interface';

interface Lobby {
    id: string;
    location: Location;
}

export const fetchLobby = async (id: string): Promise<Lobby | undefined> => {
    try {
        const response = await axios.get<Lobby>(`${API_URL}/api/v1/lobbies/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching tags:', err);
        return undefined;
    }
};

export const postLobby = async (location: Location): Promise<Lobby | undefined> => {
    try {
        const response = await axios.post<Lobby>(`${API_URL}/api/v1/lobbies`, {
            location
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching tags:', err);
        return undefined;
    }
};
