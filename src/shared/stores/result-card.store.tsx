import { create } from 'zustand';
import { Result } from '../types/results.interface';

type Store = {
  result: Result | null;
  setResult: (result: Result) => void;
};

export const useResultCardStore = create<Store>()((set) => ({
  result: null,
  setResult: (result: Result) => set({ result }),
}));

export function getResultStoreMethods() {
  const { result, setResult } = useResultCardStore.getState();
  return { result, setResult };
}
