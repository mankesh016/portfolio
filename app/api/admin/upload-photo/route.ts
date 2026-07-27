import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { put } from "@vercel/blob";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const stamp = Date.now();

  const small = await sharp(buffer).resize(120, 120, { fit: "cover" }).webp({ quality: 85 }).toBuffer();

  const medium = await sharp(buffer).resize(480, 480, { fit: "cover" }).webp({ quality: 85 }).toBuffer();

  const [smallBlob, mediumBlob] = await Promise.all([
    put(`profile/small-${stamp}.webp`, small, { access: "public", contentType: "image/webp" }),
    put(`profile/medium-${stamp}.webp`, medium, { access: "public", contentType: "image/webp" }),
  ]);

  return NextResponse.json({ small: smallBlob.url, medium: mediumBlob.url });
}
