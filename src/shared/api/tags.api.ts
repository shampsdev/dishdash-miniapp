import axios from 'axios';
import { Tag } from '../types/tag.interface';
import { API_URL } from '../constants';

export const fetchTags = async (): Promise<Tag[] | undefined> => {
  try {
    const response = await axios.get<Tag[]>(`${API_URL}/api/v1/places/tags`);
    return response.data;
  } catch (err) {
    console.error('Error fetching tags:', err);
    return undefined;
  }
};
