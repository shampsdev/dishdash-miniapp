import axios from 'axios';
import { API_URL } from '@/shared/constants';

import { initData } from '@telegram-apps/sdk-react';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-Token': initData.raw()
  }
});

export const axiosInstance = instance;
