import { prisma } from "@/lib/prisma";
import ProjectMedia from "@/components/ProjectMedia";
import ProjectButtonsRow from "@/components/ProjectButtonsRow";
import TechPill from "@/components/TechPill";
import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUniqueOrThrow({ where: { slug } });
  const techStack = project.techStack as { name: string; iconSlug?: string }[];
  const buttons = project.buttons as any[];

  return (
    <div>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.name }]}
      />
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Link>

      <div className="rounded-2xl border border-stone-300 bg-[#fdfbf6] p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <Avatar src={project.logoUrl} shape="square" size="lg" fallback={project.name[0]} />
          <div className="flex flex-col">
            <h1 className={cn(serif.className, "text-3xl text-stone-900")}>{project.name}</h1>
            <p className="text-sm text-stone-500">{project.shortDescription}</p>
          </div>
        </div>

        <p className="mt-5 leading-relaxed text-stone-600">{project.longDescription}</p>

        <div className="mt-5">
          <ProjectMedia mediaType={project.mediaType} mediaUrl={project.mediaUrl} />
        </div>

        <div className="mt-5">
          <ProjectButtonsRow buttons={buttons} />
        </div>

        <div className="mt-6 border-t border-stone-200 pt-5">
          <h2 className="mb-3 font-mono text-xs tracking-wide text-stone-400 uppercase">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <TechPill
                key={t.name}
                name={t.name}
                iconSlug={t.iconSlug ?? null}
                className="rounded-full border-stone-300 bg-white text-stone-700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
