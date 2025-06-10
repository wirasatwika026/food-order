import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/profile")
  ) {
    // Admin routes require admin role
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!session || !session.user.user_metadata.role === "admin") {
        const returnUrl = encodeURIComponent(request.nextUrl.pathname);
        return NextResponse.redirect(
          new URL(`/login?returnUrl=${returnUrl}`, request.url)
        );
      }
    }
    // Profile routes require any authenticated user
    else if (!session) {
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(
        new URL(`/login?returnUrl=${returnUrl}`, request.url)
      );
    }
  }

  // Public routes that should redirect logged in users (optional)
  if (
    session &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

// Specify which paths should be checked by the middleware
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/login", "/register"],
};
