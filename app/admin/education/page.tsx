import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteEducation, moveEducation } from "@/app/actions/education";
import { formatYearRange } from "@/lib/duration";
import AdminEntityRow from "@/components/admin/AdminEntityRow";

export default async function AdminEducationPage() {
  const items = await prisma.education.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Education</h1>
        <Link href="/admin/education/new" className="text-sm text-orange-600">
          + Add
        </Link>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((edu) => (
          <AdminEntityRow
            key={edu.id}
            title={
              <>
                <span className="font-medium text-neutral-800">{edu.institutionName}</span>{" "}
                <span className="text-neutral-400">— {edu.degree}</span>
              </>
            }
            meta={formatYearRange(edu.startYear, edu.endYear, edu.isCurrent)}
            editHref={`/admin/education/${edu.id}/edit`}
            onDelete={deleteEducation.bind(null, edu.id)}
            onMoveUp={moveEducation.bind(null, edu.id, "up")}
            onMoveDown={moveEducation.bind(null, edu.id, "down")}
          />
        ))}
      </div>
    </div>
  );
}
