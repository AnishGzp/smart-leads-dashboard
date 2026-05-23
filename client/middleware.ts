import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const path = req.nextUrl.pathname;

  const publicRoutes = ["/login"];

  const isPublicRoute = publicRoutes.includes(path);

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
