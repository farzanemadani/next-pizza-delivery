import type { IUser } from "@/interfaces";


export type UserRole = "customer" | "admin";

export type RegisterUserResult = {
  success: boolean;
  message: string;
};

export type LoginUserResult =
  | {
      success: true;
      message: string;
      token: string;
      role: IUser["role"];
    }
  | {
      success: false;
      message: string;
    };

export type TokenPayload = {
  userID: string;
  email: string;
  iat?: number;
  exp?: number;
};
