"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function assertAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) throw new Error("Not authorized");
}

function revalidateAll() {
  revalidatePath("/admin/info-lines");
  revalidatePath("/");
}

export async function createInfoLine(formData: FormData) {
  await assertAdmin();
  const count = await prisma.infoLine.count();
  await prisma.infoLine.create({
    data: {
      iconType: formData.get("iconType") as string,
      iconValue: (formData.get("iconValue") as string).trim(),
      text: (formData.get("text") as string).trim(),
      href: (formData.get("href") as string)?.trim() || null,
      featured: formData.get("featured") === "on",
      order: count,
    },
  });
  revalidateAll();
}

export async function deleteInfoLine(id: string) {
  await assertAdmin();
  await prisma.infoLine.delete({ where: { id } });
  revalidateAll();
}

export async function toggleInfoLineFeatured(id: string, featured: boolean) {
  await assertAdmin();
  await prisma.infoLine.update({ where: { id }, data: { featured } });
  revalidateAll();
}

export async function moveInfoLine(id: string, direction: "up" | "down") {
  await assertAdmin();
  const lines = await prisma.infoLine.findMany({ orderBy: { order: "asc" } });
  const index = lines.findIndex((l) => l.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= lines.length) return;

  await prisma.$transaction([
    prisma.infoLine.update({ where: { id: lines[index].id }, data: { order: lines[swapIndex].order } }),
    prisma.infoLine.update({ where: { id: lines[swapIndex].id }, data: { order: lines[index].order } }),
  ]);
  revalidateAll();
}
