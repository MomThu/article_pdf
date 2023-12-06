import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/component")) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      NextResponse.next();
    }
  },
  {
    secret: process.env.SECRET,
  }
);
export const config = {
  // matcher: ["/api/:path*"],
  matcher: [
    "/api/article/add",
    "/api/article/bought",
    "/api/article/payment",
    "/api/article/searchbought",
    "/api/authentication/changepassword",
    "/api/authentication/updateInfo",
    "/api/author/add",
    "/api/cart/:path*",
    "/api/customer/:path*",
    "/api/pdf/content",
    "/api/upload",
    "/component/:path*",
    "/payment/:path*",
    "/user/:path*",
    "/cart",
  ],
};
