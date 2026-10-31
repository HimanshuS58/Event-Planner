import { NextRequest } from "next/server";

// This middleware will protect the /dashboard and /events routes, redirecting unauthenticated users to the sign-in page.
export default async function proxy(request: NextRequest) {
    const { auth } = await import("@/lib/auth/server");
    return auth.middleware({ loginUrl: "/auth/sign-in" })(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/events/:path*"],
};