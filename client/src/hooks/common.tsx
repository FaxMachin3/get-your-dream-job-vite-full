import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { getJobs } from '../apis/job';
import { STORE, _PAGE_SIZE } from '../constants';
import { useAppStore } from '../stores';
import { FilterType } from '../types/common-types';
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

export const usePrefetchJobs = (
  offset: number,
  isJobLoading: boolean,
  jobFilter: FilterType
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isJobLoading) {
      offset > 1 &&
        queryClient.prefetchQuery(
          [STORE.SUB_STORE.JOBS, offset - 1, jobFilter],
          () => getJobs({ offset: offset - 1, pageSize: _PAGE_SIZE, jobFilter })
        );

      queryClient.prefetchQuery(
        [STORE.SUB_STORE.JOBS, offset + 1, jobFilter],
        () => getJobs({ offset: offset + 1, pageSize: _PAGE_SIZE, jobFilter })
      );
    }
  }, [offset, isJobLoading]);
};
