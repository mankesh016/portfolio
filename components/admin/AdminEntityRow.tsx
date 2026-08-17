import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, ArrowDown, Star, Trash2 } from "lucide-react";

export default function AdminEntityRow({
  leading,
  title,
  meta,
  editHref,
  onDelete,
  onMoveUp,
  onMoveDown,
  featured,
  onToggleFeatured,
}: {
  leading?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  editHref?: string;
  onDelete: (formData: FormData) => void;
  onMoveUp?: (formData: FormData) => void;
  onMoveDown?: (formData: FormData) => void;
  featured?: boolean;
  onToggleFeatured?: (formData: FormData) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-neutral-100 px-3 py-2 text-sm">
      <div className="flex items-center gap-3">
        {leading}
        <div>
          {title}
          {meta && <div className="text-xs text-neutral-400">{meta}</div>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {onToggleFeatured && (
          <form action={onToggleFeatured}>
            <button type="submit" aria-label="Toggle featured">
              <Star className={`h-4 w-4 ${featured ? "fill-orange-400 text-orange-400" : "text-neutral-300"}`} />
            </button>
          </form>
        )}
        {onMoveUp && (
          <form action={onMoveUp}>
            <button type="submit">
              <ArrowUp className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
            </button>
          </form>
        )}
        {onMoveDown && (
          <form action={onMoveDown}>
            <button type="submit">
              <ArrowDown className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
            </button>
          </form>
        )}
        {editHref && (
          <Link href={editHref} className="text-blue-600">
            Edit
          </Link>
        )}
        <form action={onDelete}>
          <button type="submit" aria-label="Delete">
            <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
          </button>
        </form>
      </div>
    </div>
  );
}
