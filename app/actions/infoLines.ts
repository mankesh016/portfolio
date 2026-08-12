"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";
import { swapOrder } from "@/lib/reorder";

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
  await swapOrder(lines, id, direction, (itemId, order) =>
    prisma.infoLine.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateAll();
}
