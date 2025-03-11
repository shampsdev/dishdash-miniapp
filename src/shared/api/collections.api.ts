import { Collection } from '../interfaces/collection.interface';
import { axiosInstance } from '../instance/axios.instance';

export const fetchCollection = async (
  id: string
): Promise<Collection | undefined> => {
  try {
    const response = await axiosInstance.get<Collection>(
      `/api/v1/collections/${id}`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching lobby:', err);
    return undefined;
  }
};
