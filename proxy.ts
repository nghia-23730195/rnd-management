import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "smlab_session";

const protectedPrefixes = [
  "/dashboard",
  "/ideas",
  "/projects",
  "/experiments",
  "/library",
  "/members",
  "/settings",
  "/database-test",
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasSessionCookie = Boolean(
    request.cookies.get(SESSION_COOKIE_NAME)?.value
  );

  const isProtectedRoute = protectedPrefixes.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(`${prefix}/`)
  );

  if (isProtectedRoute && !hasSessionCookie) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (pathname === "/login" && hasSessionCookie) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ideas/:path*",
    "/projects/:path*",
    "/experiments/:path*",
    "/library/:path*",
    "/members/:path*",
    "/settings/:path*",
    "/database-test/:path*",
    "/login",
  ],
};