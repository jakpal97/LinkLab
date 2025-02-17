import { NextResponse } from "next/server";

const ipRequests = new Map<string, number>(); // Przechowuje liczbę żądań na IP

export function middleware(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (ip !== "unknown") {
    const now = Date.now();
    const requests = ipRequests.get(ip) || 0;

    if (requests > 3) {
      return new NextResponse("Too many requests", { status: 429 });
    }

    ipRequests.set(ip, requests + 1);
    setTimeout(() => ipRequests.delete(ip), 60000); // Reset po 60 sekundach
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};