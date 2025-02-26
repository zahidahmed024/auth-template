import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ["/profile", "/posts"];
  const authRoutes = ["/login", "/register"];

  // Check if token exists in cookies
  const hasAccessToken = request.cookies.has("access_token");

  // If trying to access protected route without token
  if (
    protectedRoutes.some((route) => path.startsWith(route)) &&
    !hasAccessToken
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If trying to access auth routes with token
  if (authRoutes.some((route) => path.startsWith(route)) && hasAccessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

// Add config for middleware to specify on which routes it should run
export const config = {
  matcher: ["/profile/:path*", "/posts/:path*", "/signin", "/signup"],
};

export default middleware;
