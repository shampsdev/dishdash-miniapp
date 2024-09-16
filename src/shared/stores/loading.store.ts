import create from 'zustand';

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export function getLoadingStoreMethods() {
  const { isLoading, setIsLoading } = useLoadingStore.getState();
  return { isLoading, setIsLoading };
}
