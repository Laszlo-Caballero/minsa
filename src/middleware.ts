import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookies = req.cookies;

  const token = cookies.get("token")?.value;

  const pathName = req.nextUrl.pathname;

  if (!token && pathName !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
