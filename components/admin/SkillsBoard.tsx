"use client";

import { useEffect, useState } from "react";
import SortableList from "./SortableList";
import CategoryCard from "./CategoryCard";
import { reorderCategories } from "@/app/actions/skills";
import type { CategoryWithSkills } from "@/lib/types";

export default function SkillsBoard({ initialCategories }: { initialCategories: CategoryWithSkills[] }) {
  const [categories, setCategories] = useState(initialCategories);
  useEffect(() => setCategories(initialCategories), [initialCategories]);

  function handleReorder(reordered: CategoryWithSkills[]) {
    setCategories(reordered);
    reorderCategories(reordered.map((c) => c.id));
  }

  return (
    <SortableList
      items={categories}
      onReorder={handleReorder}
      className="space-y-4"
      renderItem={(category) => <CategoryCard key={category.id} category={category} />}
    />
  );
}
