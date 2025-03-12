import { Tag } from '@/shared/interfaces/tag.interface';
import { axiosInstance } from '@/shared/instance/axios.instance';

export const fetchTags = async (): Promise<Tag[] | undefined> => {
  try {
    const response = await axiosInstance.get<Tag[]>('/api/v1/places/tag');
    return response.data;
  } catch (err) {
    console.error('Error fetching tags:', err);
    return undefined;
  }
};
