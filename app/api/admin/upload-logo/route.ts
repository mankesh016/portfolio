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

  const optimized = await sharp(buffer)
    .resize(256, 256, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const blob = await put(`logos/${Date.now()}.webp`, optimized, {
    access: "public",
    contentType: "image/webp",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ url: blob.url });
}
