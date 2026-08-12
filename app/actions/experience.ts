"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";

function revalidateAll() {
  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  revalidatePath("/");
}

function parseLines(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseSkills(text: string) {
  return parseLines(text).map((line) => {
    const [name, iconSlug] = line.split("|").map((p) => p.trim());
    return { name, iconSlug: iconSlug || undefined };
  });
}

function buildData(formData: FormData) {
  const isCurrent = formData.get("isCurrent") === "on";
  return {
    companyName: formData.get("companyName") as string,
    companyUrl: (formData.get("companyUrl") as string) || null,
    logoUrl: (formData.get("logoUrl") as string) || null,
    title: formData.get("title") as string,
    location: (formData.get("location") as string) || null,
    startMonth: Number(formData.get("startMonth")),
    startYear: Number(formData.get("startYear")),
    endMonth: isCurrent ? null : Number(formData.get("endMonth")) || null,
    endYear: isCurrent ? null : Number(formData.get("endYear")) || null,
    isCurrent,
    bulletsLong: parseLines(formData.get("bulletsLong") as string),
    summaryShort: formData.get("summaryShort") as string,
    skillsUsed: parseSkills(formData.get("skillsUsed") as string),
    isFeatured: formData.get("isFeatured") === "on",
  };
}

export async function createExperience(formData: FormData) {
  await assertAdmin();
  await prisma.experience.create({ data: buildData(formData) });
  revalidateAll();
}

export async function updateExperience(id: string, formData: FormData) {
  await assertAdmin();
  await prisma.experience.update({ where: { id }, data: buildData(formData) });
  revalidateAll();
}

export async function deleteExperience(id: string) {
  await assertAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidateAll();
}
