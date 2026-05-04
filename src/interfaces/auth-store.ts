import type { UserPublic } from "@/types";

export interface AuthState {
  user: UserPublic | null;
  loading: boolean;
  error: string;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}
