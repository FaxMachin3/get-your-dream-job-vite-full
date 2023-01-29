import { StateCreator } from 'zustand';
import { AppSlice, ThemeSlice, UserSlice } from '../types/common-types';

const initialState = {
  jobFilter: {
    tags: [],
    minSalary: ''
  }
};

export const createAppSlice: StateCreator<
  ThemeSlice & UserSlice & AppSlice,
  [],
  [],
  AppSlice
> = (set) => ({
  ...initialState,
  setTag: (tags: string[]) =>
    set((state) => ({
      jobFilter: {
        ...state.jobFilter,
        tags
      }
    })),
  setMinSalary: (minSalary: string) =>
    set((state) => ({
      jobFilter: {
        ...state.jobFilter,
        minSalary
      }
    })),
  resetAppSlice: () => set(initialState)
});
