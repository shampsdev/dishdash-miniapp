import { create } from 'zustand';
import { Result } from '../interfaces/results.interface';

type Store = {
  result: Result | null;
  setResult: (result: Result) => void;
  resetStore: () => void;
};

export const useResultStore = create<Store>()((set) => ({
  result: null,
  setResult: (result: Result) => set({ result }),
  resetStore: () => set({ result: null })
}));

export function getResultStoreMethods() {
  const { result, setResult, resetStore } = useResultStore.getState();
  return { result, setResult, resetStore };
}
