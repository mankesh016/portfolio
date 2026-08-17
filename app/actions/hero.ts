"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";
import { swapOrder } from "@/lib/reorder";

function revalidateAll() {
  revalidatePath("/admin/hero");
  revalidatePath("/");
}

// Hero profile (singleton: mail, resume, location, open-to-work status)

export async function updateHeroProfile(formData: FormData) {
  await assertAdmin();
  const data = {
    mail: (formData.get("mail") as string)?.trim() || null,
    resumeUrl: (formData.get("resumeUrl") as string)?.trim() || null,
    location: (formData.get("location") as string)?.trim() || null,
    isOpenToWork: formData.get("isOpenToWork") === "on",
    openToWorkText: (formData.get("openToWorkText") as string)?.trim() || null,
  };
  await prisma.heroProfile.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidateAll();
}

// Hero entries (logo + *bold* text + optional link)

function buildEntryData(formData: FormData) {
  return {
    logoUrl: (formData.get("logoUrl") as string) || null,
    text: formData.get("text") as string,
    link: (formData.get("link") as string)?.trim() || null,
  };
}

export async function createHeroEntry(formData: FormData) {
  await assertAdmin();
  const count = await prisma.heroEntry.count();
  await prisma.heroEntry.create({ data: { ...buildEntryData(formData), order: count } });
  revalidateAll();
}

export async function updateHeroEntry(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.heroEntry.update({ where: { id }, data: buildEntryData(formData) });
  revalidateAll();
}

export async function deleteHeroEntry(id: string) {
  await assertAdmin();
  await prisma.heroEntry.delete({ where: { id } });
  revalidateAll();
}

export async function moveHeroEntry(id: string, direction: "up" | "down") {
  await assertAdmin();
  const entries = await prisma.heroEntry.findMany({ orderBy: { order: "asc" } });
  await swapOrder(entries, id, direction, (itemId, order) =>
    prisma.heroEntry.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateAll();
}
