import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const session = request.cookies.get("admin_session")?.value;
  const isAuthed = Boolean(
    session && process.env.ADMIN_PASSWORD && session === process.env.ADMIN_PASSWORD
  );

  if (!isAuthed && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAuthed && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};