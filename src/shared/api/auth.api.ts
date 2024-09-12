import { API_URL } from '@/shared/constants';
import { User } from '@/shared/types/user.type';
import axios from 'axios';

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>,
): Promise<User | undefined> => {
  return axios
    .post<User>(`${API_URL}/api/v1/users`, user)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};

export const getUser = async (id: string): Promise<User | undefined> => {
  return await axios
    .get<User>(`${API_URL}/api/v1/users/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return undefined;
    });
};

export const updateUser = async (user: User): Promise<User | undefined> => {
  return await axios
    .put<User>(`${API_URL}/api/v1/users`, user, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return undefined;
    });
};
