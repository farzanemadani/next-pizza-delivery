import type { IUser } from "./user";

export interface ProfileCardProps {
  user: Pick<IUser, "id" | "name" | "email" | "role">;
}
