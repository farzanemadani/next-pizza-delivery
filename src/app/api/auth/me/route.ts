import { NextResponse } from "next/server";
import { validateJwtTokenAndGetUser } from "@/actions/auth";

export async function GET() {
  const result = await validateJwtTokenAndGetUser();

  return NextResponse.json(result);
}
