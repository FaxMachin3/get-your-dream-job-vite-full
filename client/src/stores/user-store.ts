import { StateCreator } from 'zustand';
import { CUSTOM_HEADER } from '../constants';
import { ThemeSlice, UserSlice } from '../types/common-types';

export const createUserSlice: StateCreator<
    ThemeSlice & UserSlice,
    [],
    [],
    UserSlice
> = (set) => ({
    userToken: null,
    currentUser: null,
    setUserToken: (token) =>
        set((state) => ({
            userToken: token,
        })),
    setCurrentUser: (user) =>
        set((state) => ({
            currentUser: user,
        })),
});
