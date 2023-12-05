import { withAuth } from "next-auth/middleware";
export default withAuth({
  secret: process.env.SECRET
})
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
  ]
};