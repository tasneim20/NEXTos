import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // localePrefix: "always",
});

export default function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const response = intlMiddleware(req);

  const token = req.cookies.get("accessToken");

  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((route) => pathname.includes(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/en/login", req.url));
  }
  return response;
}
export const config = { matcher: ["/", "/(ar|en)/:path*"] };
