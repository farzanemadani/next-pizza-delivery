"use server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/env";

export const createJwt = async (payload: { id: string; email: string }) => {
  const token = jwt.sign(
    {
      userID: payload.id,
      email: payload.email,
    },
    JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return token;
};
