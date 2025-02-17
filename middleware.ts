import { NextResponse, NextRequest } from "next/server";

const ipRequests = new Map<string, number>();

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Omijamy stronę główną "/"
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Sprawdzamy, czy ścieżka pasuje do dynamicznego wzorca "/[dynamic]"
  const dynamicPathRegex = /^\/[^\/]+$/; // Pasuje do "/coś", ale nie do "/coś/innego"

  if (!dynamicPathRegex.test(pathname)) {
    return NextResponse.next();
  }

  // Pobieramy IP użytkownika
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (ip !== "unknown") {
    const now = Date.now();
    const requests = ipRequests.get(ip) || 0;

    if (requests > 5) {
      return new NextResponse("Too many requests", { status: 429 });
    }

    ipRequests.set(ip, requests + 1);
    setTimeout(() => ipRequests.delete(ip), 60000);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // Middleware działa na wszystkich ścieżkach, ale filtrujemy je w kodzie
};
