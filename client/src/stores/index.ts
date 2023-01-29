import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppSlice, ThemeSlice, UserSlice } from '../types/common-types';
import { createUserSlice } from './user-slice';
import { createThemeSlice } from './theme-slice';
import { createAppSlice } from './app-slice';
import { STORE } from '../constants';

export const useAppStore = create<ThemeSlice & UserSlice & AppSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createThemeSlice(...a),
        ...createUserSlice(...a),
        ...createAppSlice(...a)
      }),
      { name: STORE.APP_STORE }
    )
  )
);
