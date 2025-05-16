import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/blog",
  "/blog/((?!create.*).*)",
  "/tags/:path*",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const authUserId = "user_2wgejriLGm8l84DvXC0PQow2pjD";

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // 权限控制，当本人登录时才能够进行文章发布
  if (path === "/blog/create") {
    const { userId } = await auth();

    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    if (userId !== authUserId) {
      const homeUrl = new URL("/", req.url);

      return NextResponse.redirect(homeUrl);
    }
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
