import { StateCreator } from 'zustand';
import { AppSlice, ThemeSlice, UserSlice } from '../types/common-types';

const initialState = {
  userToken: null,
  currentUser: null
};

export const createUserSlice: StateCreator<
  ThemeSlice & UserSlice & AppSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  ...initialState,
  setUserToken: (token) =>
    set((state) => ({
      userToken: token
    })),
  setCurrentUser: (user) =>
    set((state) => ({
      currentUser: user
    })),
  resetUserSlice: () => set(initialState)
});
