"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";
import { extractYoutubeId } from "@/lib/youtube";

async function assertAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) throw new Error("Not authorized");
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}

function parseTechStack(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, iconSlug] = line.split("|").map((p) => p.trim());
      return { name, iconSlug: iconSlug || undefined };
    });
}

function buildProjectData(formData: FormData) {
  const mediaType = formData.get("mediaType") as string;
  let mediaUrl = (formData.get("mediaUrl") as string) || null;

  if (mediaType === "youtube") {
    const id = extractYoutubeId(mediaUrl ?? "");
    mediaUrl = id;
  }

  const buttonsRaw = formData.get("buttons") as string;
  const buttons = buttonsRaw ? JSON.parse(buttonsRaw) : [];

  return {
    name: formData.get("name") as string,
    logoUrl: (formData.get("logoUrl") as string) || null,
    shortDescription: formData.get("shortDescription") as string,
    longDescription: formData.get("longDescription") as string,
    mediaType,
    mediaUrl,
    buttons,
    techStack: parseTechStack(formData.get("techStack") as string),
  };
}

export async function createProject(formData: FormData) {
  await assertAdmin();
  const name = formData.get("name") as string;
  const count = await prisma.project.count();
  await prisma.project.create({
    data: { ...buildProjectData(formData), slug: slugify(name), order: count },
  });
  revalidateAll();
}

export async function updateProject(id: string, formData: FormData) {
  await assertAdmin();
  const project = await prisma.project.update({
    where: { id },
    data: buildProjectData(formData),
  });
  revalidateAll(project.slug);
}

export async function deleteProject(id: string) {
  await assertAdmin();
  const project = await prisma.project.delete({ where: { id } });
  revalidateAll(project.slug);
}
