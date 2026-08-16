"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";
import { swapOrder } from "@/lib/reorder";

function revalidateAll() {
  revalidatePath("/admin/education");
  revalidatePath("/");
}

function buildData(formData: FormData) {
  const isCurrent = formData.get("isCurrent") === "on";
  return {
    institutionName: formData.get("institutionName") as string,
    institutionUrl: (formData.get("institutionUrl") as string) || null,
    logoUrl: (formData.get("logoUrl") as string) || null,
    degree: formData.get("degree") as string,
    startYear: Number(formData.get("startYear")),
    endYear: isCurrent ? null : Number(formData.get("endYear")) || null,
    isCurrent,
  };
}

export async function createEducation(formData: FormData) {
  await assertAdmin();
  const count = await prisma.education.count();
  await prisma.education.create({ data: { ...buildData(formData), order: count } });
  revalidateAll();
}

export async function updateEducation(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.education.update({ where: { id }, data: buildData(formData) });
  revalidateAll();
}

export async function deleteEducation(id: string) {
  await assertAdmin();
  await prisma.education.delete({ where: { id } });
  revalidateAll();
}

export async function moveEducation(id: string, direction: "up" | "down") {
  await assertAdmin();
  const items = await prisma.education.findMany({ orderBy: { order: "asc" } });
  await swapOrder(items, id, direction, (itemId, order) =>
    prisma.education.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateAll();
}
