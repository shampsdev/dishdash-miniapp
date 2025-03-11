import axios from 'axios';
import { API_URL } from '@/shared/constants';

const instance = axios.create({
  baseURL: API_URL,
});

export const axiosInstance = instance;
