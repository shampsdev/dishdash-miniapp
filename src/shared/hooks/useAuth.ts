import { useContext } from 'react';
import { AuthContext } from '@/shared/providers/auth.provider';

export const useAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return store((store) => store);
};
