"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";
import { swapOrder } from "@/lib/reorder";

function revalidateAll() {
  revalidatePath("/admin/cp");
  revalidatePath("/cp");
}

function parseInfoLines(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [icon, ...rest] = line.split("|").map((p) => p.trim());
      return { icon, text: rest.join("|").trim() };
    });
}

function buildCardData(formData: FormData) {
  return {
    heading: formData.get("heading") as string,
    subtitle: (formData.get("subtitle") as string) || null,
    logoUrl: (formData.get("logoUrl") as string) || null,
    infoLines: parseInfoLines(formData.get("infoLines") as string),
  };
}

export async function createCard(formData: FormData) {
  await assertAdmin();
  const count = await prisma.platformCard.count();
  await prisma.platformCard.create({ data: { ...buildCardData(formData), order: count } });
  revalidateAll();
}

export async function updateCard(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.platformCard.update({ where: { id }, data: buildCardData(formData) });
  revalidateAll();
}

export async function deleteCard(id: string) {
  await assertAdmin();
  await prisma.platformCard.delete({ where: { id } });
  revalidateAll();
}

export async function addCardImage(cardId: string, formData: FormData) {
  await assertAdmin();
  const url = formData.get("url") as string;
  if (!url) return;

  const count = await prisma.platformCardImage.count({ where: { cardId } });
  if (count >= 5) throw new Error("Maximum 5 images per card");

  await prisma.platformCardImage.create({
    data: { cardId, url, caption: (formData.get("caption") as string) || null, order: count },
  });
  revalidateAll();
}

export async function deleteCardImage(id: string) {
  await assertAdmin();
  await prisma.platformCardImage.delete({ where: { id } });
  revalidateAll();
}

export async function moveCardImage(cardId: string, id: string, direction: "up" | "down") {
  await assertAdmin();
  const images = await prisma.platformCardImage.findMany({ where: { cardId }, orderBy: { order: "asc" } });
  await swapOrder(images, id, direction, (itemId, order) =>
    prisma.platformCardImage.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateAll();
}
