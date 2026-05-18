import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/admin/giris"];

export default auth((req) => {
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!req.auth) {
    const signInUrl = new URL("/admin/giris", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
