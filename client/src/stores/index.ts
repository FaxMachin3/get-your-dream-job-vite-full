import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ThemeSlice, UserSlice } from "../types/common-types";
import { createUserSlice } from "./user-store";
import { createThemeSlice } from "./theme-store";
import { STORE } from "../constants";

export const useAppStore = create<ThemeSlice & UserSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createThemeSlice(...a),
        ...createUserSlice(...a),
      }),
      { name: STORE.APP_STORE }
    )
  )
);
