import axios from 'axios';
import { Tag } from '../interfaces/tag.interface';
import { API_URL } from '../constants';

export const fetchTags = async (): Promise<Tag[] | undefined> => {
  try {
    const response = await axios.get<Tag[]>(`${API_URL}/api/v1/places/tag`);
    return response.data;
  } catch (err) {
    console.error('Error fetching tags:', err);
    return undefined;
  }
};
