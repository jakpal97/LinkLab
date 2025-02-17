import { NextResponse, NextRequest } from "next/server";
import { Redis } from "@upstash/redis";


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function middleware(req: NextRequest) {
  
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("cf-connecting-ip") || 
    req.headers.get("x-real-ip") ||
    "unknown";

  console.log("📌 IP Użytkownika:", ip);

  if (ip === "unknown") {
    return NextResponse.next();
  }


  const key = `rate-limit:${ip}`;
  const requests = (await redis.get<number>(key)) || 0;

  console.log(`🔄 Liczba żądań dla IP ${ip}: ${requests}`);

  if (requests >= 5) {
    console.log("⛔ Blokada IP:", ip);
    return new NextResponse("Too many requests", { status: 429 });
  }

 
  await redis.set(key, requests + 1, { ex: 60 });

  return NextResponse.next();
}


export const config = {
  matcher: "/:path*",
};
