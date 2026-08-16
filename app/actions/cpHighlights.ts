"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";
import { swapOrder } from "@/lib/reorder";

function revalidateAll() {
  revalidatePath("/admin/cp-highlights");
  revalidatePath("/");
}

// Profile (rating) cards

function buildProfileCardData(formData: FormData) {
  return {
    platform: formData.get("platform") as string,
    iconSlug: (formData.get("iconSlug") as string)?.trim() || null,
    sinceMonth: formData.get("sinceMonth") ? Number(formData.get("sinceMonth")) : null,
    sinceYear: Number(formData.get("sinceYear")),
    rankTitle: formData.get("rankTitle") as string,
    rankSubtitle: (formData.get("rankSubtitle") as string)?.trim() || null,
    peak: Number(formData.get("peak")),
    contests: Number(formData.get("contests")),
    solved: Number(formData.get("solved")),
    bestRank: Number(formData.get("bestRank")),
  };
}

export async function createCpProfileCard(formData: FormData) {
  await assertAdmin();
  const count = await prisma.cpProfileCard.count();
  await prisma.cpProfileCard.create({ data: { ...buildProfileCardData(formData), order: count } });
  revalidateAll();
}

export async function updateCpProfileCard(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.cpProfileCard.update({ where: { id }, data: buildProfileCardData(formData) });
  revalidateAll();
}

export async function deleteCpProfileCard(id: string) {
  await assertAdmin();
  await prisma.cpProfileCard.delete({ where: { id } });
  revalidateAll();
}

export async function moveCpProfileCard(id: string, direction: "up" | "down") {
  await assertAdmin();
  const items = await prisma.cpProfileCard.findMany({ orderBy: { order: "asc" } });
  await swapOrder(items, id, direction, (itemId, order) =>
    prisma.cpProfileCard.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateAll();
}

// Achievement cards

function buildAchievementCardData(formData: FormData) {
  return {
    label: formData.get("label") as string,
    description: formData.get("description") as string,
  };
}

export async function createCpAchievementCard(formData: FormData) {
  await assertAdmin();
  const count = await prisma.cpAchievementCard.count();
  await prisma.cpAchievementCard.create({ data: { ...buildAchievementCardData(formData), order: count } });
  revalidateAll();
}

export async function updateCpAchievementCard(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.cpAchievementCard.update({ where: { id }, data: buildAchievementCardData(formData) });
  revalidateAll();
}

export async function deleteCpAchievementCard(id: string) {
  await assertAdmin();
  await prisma.cpAchievementCard.delete({ where: { id } });
  revalidateAll();
}

export async function moveCpAchievementCard(id: string, direction: "up" | "down") {
  await assertAdmin();
  const items = await prisma.cpAchievementCard.findMany({ orderBy: { order: "asc" } });
  await swapOrder(items, id, direction, (itemId, order) =>
    prisma.cpAchievementCard.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateAll();
}
