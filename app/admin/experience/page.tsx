import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteExperience } from "@/app/actions/experience";
import { formatRange } from "@/lib/duration";

export default async function AdminExperiencePage() {
  const items = await prisma.experience.findMany({
    orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Experience</h1>
        <Link href="/admin/experience/new" className="text-sm text-orange-600">
          + Add
        </Link>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center justify-between rounded-md border border-neutral-100 px-3 py-2 text-sm"
          >
            <div>
              <span className="font-medium text-neutral-800">{exp.companyName}</span>{" "}
              <span className="text-neutral-400">— {exp.title}</span>
              <div className="text-xs text-neutral-400">
                {formatRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/experience/${exp.id}/edit`} className="text-blue-600">
                Edit
              </Link>
              <form action={deleteExperience.bind(null, exp.id)}>
                <button className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
