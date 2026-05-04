import type { UserRole } from "@/types";

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  password: string;
  name: string;
  created_at: string;
}
