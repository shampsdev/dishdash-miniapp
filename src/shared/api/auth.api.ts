import { User } from '@/shared/interfaces/user.interface';
import { axiosInstance } from '@/shared/instance/axios.instance';

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User | null> => {
  try {
    const res = await axiosInstance.post<User>('/api/v1/users', user);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const res = await axiosInstance.get<User>(`/api/v1/users/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateUser = async (user: User): Promise<User | null> => {
  try {
    const res = await axiosInstance.put<User>('/api/v1/users', user, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
