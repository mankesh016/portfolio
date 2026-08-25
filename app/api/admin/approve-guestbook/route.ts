import { NextRequest, NextResponse } from "next/server";
import { approveEntry } from "@/app/actions/guestbook";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    try {
      await approveEntry(id);
    } catch {
      // Not signed in as admin, or the entry no longer exists — fall through to the guestbook page either way.
    }
  }

  return NextResponse.redirect(new URL("/guestbook", req.url));
}
