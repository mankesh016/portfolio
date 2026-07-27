import { prisma } from "@/lib/prisma";
import SkillsBoard from "@/components/admin/SkillsBoard";
import { createCategory } from "@/app/actions/skills";

export default async function AdminSkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Skills</h1>
      <form action={createCategory} className="mt-4 flex gap-2">
        <input
          name="name"
          placeholder="New category name"
          required
          className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <button className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">Add Category</button>
      </form>
      <div className="mt-6">
        <SkillsBoard initialCategories={categories} />
      </div>
    </div>
  );
}
