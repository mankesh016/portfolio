"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Star } from "lucide-react";
import { deleteSkill, toggleFeatured } from "@/app/actions/skills";
import type { SkillType } from "@/lib/types";

export default function SkillRow({ skill }: { skill: SkillType }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: skill.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-md border border-neutral-100 px-2 py-1.5"
    >
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="cursor-grab text-neutral-300 hover:text-neutral-500"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <span className="flex-1 text-sm text-neutral-700">{skill.name}</span>
      <form action={toggleFeatured.bind(null, skill.id, !skill.featured)}>
        <button type="submit" aria-label="Toggle featured">
          <Star className={`h-4 w-4 ${skill.featured ? "fill-orange-400 text-orange-400" : "text-neutral-300"}`} />
        </button>
      </form>
      <form action={deleteSkill.bind(null, skill.id)}>
        <button type="submit" className="text-red-400 hover:text-red-600">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
