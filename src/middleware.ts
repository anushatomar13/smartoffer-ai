import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/login(.*)", 
  "/signup(.*)"
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth(); 
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
    "/(api|trpc)(.*)"
  ]
};
