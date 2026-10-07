import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "visitor_no";
// A browser is counted again once this window passes. Not refreshed on revisits.
const VISIT_WINDOW_SECONDS = 60 * 60 * 12;

export async function POST() {
  const cookieStore = await cookies();

  // Same browser within the window (any tab) — reuse its number, no DB write.
  const existing = Number(cookieStore.get(COOKIE_NAME)?.value);
  if (Number.isInteger(existing) && existing > 0) {
    return Response.json({ n: existing });
  }

  // Admin visits aren't counted — show the current total instead.
  const session = await auth();
  if (session?.user?.isAdmin) {
    const stats = await prisma.siteStats.findUnique({ where: { id: "singleton" } });
    return Response.json({ n: stats?.visitorCount ?? 0, admin: true });
  }

  // Single atomic UPDATE ... RETURNING, so concurrent visitors never share a number.
  const { visitorCount } = await prisma.siteStats.update({
    where: { id: "singleton" },
    data: { visitorCount: { increment: 1 } },
  });

  cookieStore.set(COOKIE_NAME, String(visitorCount), {
    maxAge: VISIT_WINDOW_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return Response.json({ n: visitorCount });
}
