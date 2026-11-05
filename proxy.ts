import { NextRequest, NextResponse } from "next/server";


// This function checks if the request is a server action POST request by verifying the request method and checking for specific headers.
function isServerActionPost(request: NextRequest) {
  if (request.method !== "POST") return false;
  const h = request.headers;
  return Boolean(h.get("Next-Action") ?? h.get("next-action"));
}


// This middleware will protect the /dashboard and /events routes, redirecting unauthenticated users to the sign-in page.
export default async function proxy(request: NextRequest) {
  // If the request is a server action POST request, allow it to proceed without authentication checks.
  if(isServerActionPost(request)) {
    return NextResponse.next();
  }
    const { auth } = await import("@/lib/auth/server");
    return auth.middleware({ loginUrl: "/auth/sign-in" })(request);
}


// This configuration specifies that the middleware should be applied to all routes under /dashboard and /events, including any subpaths.
export const config = {
  matcher: ["/dashboard/:path*", "/events/:path*"],
};