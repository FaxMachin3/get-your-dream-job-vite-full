import { StateCreator } from 'zustand';
import { THEME, ThemeSlice, UserSlice } from '../types/common-types';

export const createThemeSlice: StateCreator<
  ThemeSlice & UserSlice,
  [],
  [],
  ThemeSlice
> = (set) => ({
  isDarkTheme: THEME.LIGHT,
  toggleTheme: () =>
    set((state) => ({
      isDarkTheme: state.isDarkTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    }))
});
