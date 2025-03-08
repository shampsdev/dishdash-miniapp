import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useServerRouteStore } from '@/shared/stores/server-route.store';

export const ServerRouteProvider = () => {
  const { route } = useServerRouteStore();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(route);
  }, [route]);

  return <Outlet />;
};
