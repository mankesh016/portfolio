import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteExperience } from "@/app/actions/experience";
import { formatRange } from "@/lib/duration";
import AdminEntityRow from "@/components/admin/AdminEntityRow";

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
          <AdminEntityRow
            key={exp.id}
            title={
              <>
                <span className="font-medium text-neutral-800">{exp.companyName}</span>{" "}
                <span className="text-neutral-400">— {exp.title}</span>
              </>
            }
            meta={formatRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
            editHref={`/admin/experience/${exp.id}/edit`}
            onDelete={deleteExperience.bind(null, exp.id)}
          />
        ))}
      </div>
    </div>
  );
}
