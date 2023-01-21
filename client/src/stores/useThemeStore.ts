import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { THEME } from '../types/common-types';

interface ThemeState {
    isDarkTheme: THEME.LIGHT | THEME.DARK;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    devtools(
        persist(
            (set) => ({
                isDarkTheme: THEME.LIGHT,
                toggleTheme: () =>
                    set((state) => ({
                        isDarkTheme:
                            state.isDarkTheme === THEME.LIGHT
                                ? THEME.DARK
                                : THEME.LIGHT,
                    })),
            }),
            { name: 'Theme Store' }
        )
    )
);
