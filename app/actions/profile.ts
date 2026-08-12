"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";

export async function updateProfile(formData: FormData) {
  await assertAdmin();
  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {
      name: formData.get("name") as string,
      tagline: formData.get("tagline") as string,
      about: formData.get("about") as string,
      photoSmallUrl: (formData.get("photoSmallUrl") as string) || null,
      photoMediumUrl: (formData.get("photoMediumUrl") as string) || null,
      githubUsername: (formData.get("githubUsername") as string) || null,
    },
    create: {
      id: "singleton",
      name: formData.get("name") as string,
      tagline: formData.get("tagline") as string,
      about: formData.get("about") as string,
      photoSmallUrl: (formData.get("photoSmallUrl") as string) || null,
      photoMediumUrl: (formData.get("photoMediumUrl") as string) || null,
      githubUsername: (formData.get("githubUsername") as string) || null,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}
