"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function assertAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) throw new Error("Not authorized");
}

function revalidateAll() {
  revalidatePath("/admin/journey");
  revalidatePath("/about");
}

function parseTags(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, iconSlug] = line.split("|").map((p) => p.trim());
      return { name, iconSlug: iconSlug || undefined };
    });
}

function buildData(formData: FormData) {
  return {
    year: Number(formData.get("year")),
    month: formData.get("month") ? Number(formData.get("month")) : null,
    dateLabel: (formData.get("dateLabel") as string) || null,
    statusLabel: (formData.get("statusLabel") as string) || null,
    statusVariant: (formData.get("statusVariant") as string) || "neutral",
    logoUrl: (formData.get("logoUrl") as string) || null,
    heading: formData.get("heading") as string,
    description: formData.get("description") as string,
    tags: parseTags(formData.get("tags") as string),
    linkType: (formData.get("linkType") as string) || null,
    linkLabel: (formData.get("linkLabel") as string) || null,
    linkUrl: (formData.get("linkUrl") as string) || null,
  };
}

export async function createJourneyEvent(formData: FormData) {
  await assertAdmin();
  const count = await prisma.journeyEvent.count();
  await prisma.journeyEvent.create({ data: { ...buildData(formData), order: count } });
  revalidateAll();
}

export async function updateJourneyEvent(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.journeyEvent.update({ where: { id }, data: buildData(formData) });
  revalidateAll();
}

export async function deleteJourneyEvent(id: string) {
  await assertAdmin();
  await prisma.journeyEvent.delete({ where: { id } });
  revalidateAll();
}

export async function moveJourneyEvent(id: string, direction: "up" | "down") {
  await assertAdmin();
  const events = await prisma.journeyEvent.findMany({ orderBy: { order: "asc" } });
  const index = events.findIndex((e) => e.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= events.length) return;

  await prisma.$transaction([
    prisma.journeyEvent.update({ where: { id: events[index].id }, data: { order: events[swapIndex].order } }),
    prisma.journeyEvent.update({ where: { id: events[swapIndex].id }, data: { order: events[index].order } }),
  ]);
  revalidateAll();
}
