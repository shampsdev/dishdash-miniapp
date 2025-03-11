import axios from 'axios';
import { API_URL } from '../constants';
import { Collection } from '../interfaces/collection.interface';

export const fetchCollection = async (
  id: string
): Promise<Collection | undefined> => {
  try {
    const response = await axios.get<Collection>(
      `${API_URL}/api/v1/collections/${id}`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching lobby:', err);
    return undefined;
  }
};
