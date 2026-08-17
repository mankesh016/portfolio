import TechPill from "@/components/TechPill";
import HighlightsPanel from "@/components/HighlightsPanel";
import type { CategoryWithSkills } from "@/lib/types";

const MAX_CATEGORIES = 4;

function SkillCategoryCard({ category }: { category: CategoryWithSkills }) {
  return (
    <div className="rounded-xl border border-stone-300 bg-[#fdfbf6] p-5 transition-colors hover:border-amber-600">
      <p className="font-mono text-xs tracking-wide text-stone-400 uppercase">{category.name}</p>
      {/* Cards only get narrow once the grid below reaches 4-across (`lg:`), so that's the only
          breakpoint where skills need to be forced one per row — otherwise there's enough width
          to let them wrap and fit as many per row as fit. */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 lg:flex-col lg:gap-3">
        {category.skills.map((skill) => (
          <TechPill
            key={skill.id}
            name={skill.name}
            iconSlug={skill.iconSlug}
            className="border-0 bg-transparent p-0 text-base text-stone-800"
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsHighlights({ categories }: { categories: CategoryWithSkills[] }) {
  const featuredCategories = categories.filter((c) => c.skills.length > 0).slice(0, MAX_CATEGORIES);

  if (featuredCategories.length === 0) return null;

  return (
    <HighlightsPanel title="Skills" linkHref="/about#skills" linkLabel="See more skills →">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {featuredCategories.map((category) => (
          <SkillCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </HighlightsPanel>
  );
}
