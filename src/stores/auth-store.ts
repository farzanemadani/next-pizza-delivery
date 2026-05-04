"use client";

import { create } from "zustand";
import type { AuthState } from "@/interfaces";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: "",

  fetchUser: async () => {
    set({ loading: true });

    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        return set({
          user: null,
          loading: false,
          error: data.message,
        });
      }

      set({
        user: data.data,
        loading: false,
        error: "",
      });
    } catch (err) {
      set({
        user: null,
        loading: false,
        error: "Unable to load user",
      });
    }
  },

  logout: () => {
    set({
      user: null,
      loading: false,
      error: "",
    });
  },
}));
