import { useCallback } from 'react';
import { useAppStore } from '../stores';
import { debounce } from '../utils/common';

export function useDebounce<T extends Function>(
  func: T,
  delay: number = 100
): T {
  return useCallback(debounce(func, delay), []);
}

export const useResetAppStore = (): (() => void) => {
  const { resetThemeSlice, resetUserSlice, resetAppSlice } = useAppStore(
    (state) => ({
      resetThemeSlice: state.resetThemeSlice,
      resetUserSlice: state.resetUserSlice,
      resetAppSlice: state.resetAppSlice
    })
  );

  const resetAppStore = useCallback(() => {
    resetThemeSlice();
    resetUserSlice();
    resetAppSlice();
  }, []);

  return resetAppStore;
};
