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
  const type = formData.get("type") as string; // "image" | "video"
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const stamp = Date.now();

  if (type === "video") {
    const blob = await put(`project-media/${stamp}.mp4`, buffer, {
      access: "public",
      contentType: file.type || "video/mp4",
    });
    return NextResponse.json({ url: blob.url });
  }

  const optimized = await sharp(buffer)
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  const blob = await put(`project-media/${stamp}.webp`, optimized, {
    access: "public",
    contentType: "image/webp",
  });
  return NextResponse.json({ url: blob.url });
}
