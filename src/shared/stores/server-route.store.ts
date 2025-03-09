import { create } from 'zustand';

export type ServerRoutes = 'lobby' | 'match' | 'results' | 'settings' | 'swiping';

interface ServerRouteState {
  route: ServerRoutes;
  setRoute: (route: ServerRoutes) => void;
  resetStore: () => void;
}

export const useServerRouteStore = create<ServerRouteState>((set) => ({
  route: 'lobby',
  setRoute: (route) => set({ route }),
  resetStore: () => set({ route: 'lobby'})
}));

export function getServerRouteMethods() {
  const { route, setRoute, resetStore } = useServerRouteStore.getState();
  return { route, setRoute, resetStore };
}
