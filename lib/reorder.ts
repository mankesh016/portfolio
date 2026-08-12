import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type Orderable = { id: string; order: number };

/**
 * Swaps `order` between the item at `id` and its neighbor in `direction`,
 * within an already-fetched, order-sorted list. No-ops at the ends of the list.
 */
export async function swapOrder(
  items: Orderable[],
  id: string,
  direction: "up" | "down",
  updateOrder: (id: string, order: number) => Prisma.PrismaPromise<unknown>,
) {
  const index = items.findIndex((item) => item.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  await prisma.$transaction([
    updateOrder(items[index].id, items[swapIndex].order),
    updateOrder(items[swapIndex].id, items[index].order),
  ]);
}
