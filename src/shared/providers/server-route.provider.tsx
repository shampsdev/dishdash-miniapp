import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ServerRoutes,
  useServerRouteStore
} from '@/shared/stores/server-route.store';

export const ServerRouteProvider = () => {
  const { route, setRoute } = useServerRouteStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.pathname.split('/')[2] as ServerRoutes;
    if (state !== undefined) setRoute(state);
  }, []);

  useEffect(() => {
    console.info('[server-routes] > ', route);
    navigate(route);
  }, [route]);

  return <Outlet />;
};
