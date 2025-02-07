import { create } from 'zustand';
import { Result } from '../types/results.interface';

type Store = {
  result: Result | null;
  setResult: (result: Result) => void;
};

export const useResultStore = create<Store>()((set) => ({
  result: null,
  setResult: (result: Result) => set({ result })
}));

export function getResultStoreMethods() {
  const { result, setResult } = useResultStore.getState();
  return { result, setResult };
}
