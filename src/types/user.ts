import type { IUser } from "@/interfaces";

export type UserPublic = Pick<IUser, "id" | "name" | "email" | "role">;
