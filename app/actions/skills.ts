"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function assertAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) throw new Error("Not authorized");
}

function revalidateAll() {
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
}

// Categories
export async function createCategory(formData: FormData) {
  await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const count = await prisma.skillCategory.count();
  await prisma.skillCategory.create({ data: { name, order: count } });
  revalidateAll();
}

export async function deleteCategory(id: string) {
  await assertAdmin();
  await prisma.skillCategory.delete({ where: { id } });
  revalidateAll();
}

export async function reorderCategories(orderedIds: string[]) {
  await assertAdmin();
  await prisma.$transaction(
    orderedIds.map((id, index) => prisma.skillCategory.update({ where: { id }, data: { order: index } })),
  );
  revalidateAll();
}

// Skills
export async function createSkill(categoryId: string, formData: FormData) {
  await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const iconSlug = (formData.get("iconSlug") as string)?.trim() || null;
  const featured = formData.get("featured") === "on";
  const count = await prisma.skill.count({ where: { categoryId } });

  await prisma.skill.create({
    data: { name, iconSlug, featured, order: count, categoryId },
  });
  revalidateAll();
}

export async function deleteSkill(id: string) {
  await assertAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidateAll();
}

export async function toggleFeatured(id: string, featured: boolean) {
  await assertAdmin();
  await prisma.skill.update({ where: { id }, data: { featured } });
  revalidateAll();
}

export async function reorderSkills(categoryId: string, orderedIds: string[]) {
  await assertAdmin();
  await prisma.$transaction(
    orderedIds.map((id, index) => prisma.skill.update({ where: { id }, data: { order: index } })),
  );
  revalidateAll();
}
