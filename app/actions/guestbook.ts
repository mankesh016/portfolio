"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";

export async function createEntry(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not signed in");

  const message = formData.get("message")?.toString().trim();
  const isAnonymous = formData.get("anonymous") === "on";
  if (!message) return;

  await prisma.guestbookEntry.create({
    data: {
      userId: session.user.id,
      message,
      isAnonymous,
      approved: session.user.isAdmin ? true : false,
    },
  });

  revalidatePath("/guestbook");
}

export async function approveEntry(id: string) {
  await assertAdmin();

  await prisma.guestbookEntry.update({ where: { id }, data: { approved: true } });
  revalidatePath("/guestbook");
}
