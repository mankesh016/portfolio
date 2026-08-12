import { prisma } from "@/lib/prisma";
import { createInfoLine, deleteInfoLine, toggleInfoLineFeatured, moveInfoLine } from "@/app/actions/infoLines";
import InfoLineIcon from "@/components/icons/InfoLineIcon";
import AdminEntityRow from "@/components/admin/AdminEntityRow";

export default async function AdminInfoLinesPage() {
  const lines = await prisma.infoLine.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Info Lines</h1>

      <form
        action={createInfoLine}
        className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-neutral-200 p-4"
      >
        <select name="iconType" className="rounded-md border border-neutral-200 px-2 py-2 text-sm">
          <option value="lucide">Lucide icon</option>
          <option value="simpleicon">Simple Icons slug</option>
        </select>
        <input
          name="iconValue"
          placeholder="e.g. MapPin or codeforces"
          required
          className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="text"
          placeholder="Text, e.g. Jaipur, India"
          required
          className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="href"
          placeholder="Link (optional)"
          className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-1 text-xs text-neutral-500">
          <input type="checkbox" name="featured" defaultChecked /> Featured
        </label>
        <button className="rounded-md bg-neutral-900 px-3 py-2 text-xs font-medium text-white">Add</button>
      </form>

      <div className="mt-4 space-y-2">
        {lines.map((line) => (
          <AdminEntityRow
            key={line.id}
            leading={<InfoLineIcon iconType={line.iconType} iconValue={line.iconValue} />}
            title={<span className="text-neutral-700">{line.text}</span>}
            onDelete={deleteInfoLine.bind(null, line.id)}
            onMoveUp={moveInfoLine.bind(null, line.id, "up")}
            onMoveDown={moveInfoLine.bind(null, line.id, "down")}
            featured={line.featured}
            onToggleFeatured={toggleInfoLineFeatured.bind(null, line.id, !line.featured)}
          />
        ))}
      </div>
    </div>
  );
}
