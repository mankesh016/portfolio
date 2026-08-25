"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth-guards";
import { sendGuestbookNotification } from "@/lib/mail";

export async function createEntry(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not signed in");

  const message = formData.get("message")?.toString().trim();
  const isAnonymous = formData.get("anonymous") === "on";
  if (!message) return;

  const entry = await prisma.guestbookEntry.create({
    data: {
      userId: session.user.id,
      message,
      isAnonymous,
      approved: false,
    },
  });

  revalidatePath("/guestbook");

  await sendGuestbookNotification({
    id: entry.id,
    name: session.user.name ?? "Someone",
    email: session.user.email ?? null,
    image: session.user.image ?? null,
    message,
    isAnonymous,
    createdAt: entry.createdAt,
  });
}

export async function approveEntry(id: string) {
  await assertAdmin();

  await prisma.guestbookEntry.update({ where: { id }, data: { approved: true } });
  revalidatePath("/guestbook");
}

export async function hideEntry(id: string) {
  await assertAdmin();

  await prisma.guestbookEntry.update({ where: { id }, data: { approved: false } });
  revalidatePath("/guestbook");
}

export async function deleteEntry(id: string) {
  await assertAdmin();

  await prisma.guestbookEntry.delete({ where: { id } });
  revalidatePath("/guestbook");
}
