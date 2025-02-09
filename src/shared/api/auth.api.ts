import { API_URL } from '@/shared/constants';
import { User } from '@/shared/interfaces/user.interface';
import axios from 'axios';

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User | null> => {
  try {
    const res = await axios.post<User>(`${API_URL}/api/v1/users`, user);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const res = await axios.get<User>(`${API_URL}/api/v1/users/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateUser = async (user: User): Promise<User | null> => {
  try {
    const res = await axios.put<User>(`${API_URL}/api/v1/users`, user, {
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
