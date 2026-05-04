import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  LOGIN_ROUTE,
  PROTECTED_PREFIXES,
  ROLE_HOME_ROUTES,
} from "@/constants/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const isProtectedRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (pathname === LOGIN_ROUTE && token) {
    const redirectPath =
      role === "admin" ? ROLE_HOME_ROUTES.admin : ROLE_HOME_ROUTES.customer;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  return NextResponse.next();
}

