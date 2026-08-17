import { auth } from "@/auth";

export async function assertAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) throw new Error("Not authorized");
}
