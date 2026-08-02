"use client";

import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Pencil, Check, X } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SkillRow from "./SkillRow";
import { createSkill, deleteCategory, reorderSkills, updateCategory } from "@/app/actions/skills";
import type { CategoryWithSkills } from "@/lib/types";

export default function CategoryCard({ category }: { category: CategoryWithSkills }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });
  const [skills, setSkills] = useState(category.skills);
  useEffect(() => setSkills(category.skills), [category.skills]);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  useEffect(() => setName(category.name), [category.name]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  function handleSkillDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = skills.findIndex((s) => s.id === active.id);
    const newIndex = skills.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(skills, oldIndex, newIndex);
    setSkills(reordered);
    reorderSkills(
      category.id,
      reordered.map((s) => s.id),
    );
  }

  async function saveName() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === category.name) {
      setName(category.name);
      setEditing(false);
      return;
    }
    const formData = new FormData();
    formData.set("name", trimmed);
    await updateCategory(category.id, formData);
    setEditing(false);
  }

  return (
    <div ref={setNodeRef} style={style} className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab text-neutral-400 hover:text-neutral-600"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {editing ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveName();
                if (e.key === "Escape") {
                  setName(category.name);
                  setEditing(false);
                }
              }}
              autoFocus
              className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm font-semibold text-neutral-800"
            />
            <button type="button" onClick={saveName} className="text-green-600 hover:text-green-700">
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setName(category.name);
                setEditing(false);
              }}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <h3 className="flex-1 font-semibold text-neutral-800">{category.name}</h3>
            <button type="button" onClick={() => setEditing(true)} className="text-neutral-300 hover:text-neutral-600">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </>
        )}

        <form action={deleteCategory.bind(null, category.id)}>
          <button type="submit" className="text-red-400 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </form>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSkillDragEnd}>
        <SortableContext items={skills.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="mt-3 space-y-1">
            {skills.map((skill) => (
              <SkillRow key={skill.id} skill={skill} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <form action={createSkill.bind(null, category.id)} className="mt-3 flex flex-wrap items-center gap-2">
        <input
          name="name"
          placeholder="Skill name"
          required
          className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
        />
        <input
          name="iconSlug"
          placeholder="icon slug (optional)"
          className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
        />
        <label className="flex items-center gap-1 text-xs text-neutral-500">
          <input type="checkbox" name="featured" /> Featured
        </label>
        <button type="submit" className="rounded-md bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
          Add
        </button>
      </form>
    </div>
  );
}
