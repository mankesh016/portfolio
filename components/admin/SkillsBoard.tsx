"use client";

import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import CategoryCard from "./CategoryCard";
import { reorderCategories } from "@/app/actions/skills";
import type { CategoryWithSkills } from "@/lib/types";

export default function SkillsBoard({ initialCategories }: { initialCategories: CategoryWithSkills[] }) {
  const [categories, setCategories] = useState(initialCategories);
  useEffect(() => setCategories(initialCategories), [initialCategories]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = categories.findIndex((c) => c.id === active.id);
    const newIndex = categories.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(categories, oldIndex, newIndex);
    setCategories(reordered);
    reorderCategories(reordered.map((c) => c.id));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
