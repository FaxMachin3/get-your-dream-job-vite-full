import { StateCreator } from 'zustand';
import { AppSlice, THEME, ThemeSlice, UserSlice } from '../types/common-types';

const initialState = {
  isDarkTheme: THEME.LIGHT
};

export const createThemeSlice: StateCreator<
  ThemeSlice & UserSlice & AppSlice,
  [],
  [],
  ThemeSlice
> = (set) => ({
  ...initialState,
  toggleTheme: () =>
    set((state) => ({
      isDarkTheme: state.isDarkTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    })),
  resetThemeSlice: () => set(initialState)
});
