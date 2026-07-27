import MiniWindow from "@/components/layout/MiniWindow";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <MiniWindow>
      <p className="font-mono text-sm text-neutral-400">cd ./projects</p>
      <p className="mt-2 text-sm text-neutral-500">This page isn't built yet — check back soon.</p>
    </MiniWindow>
  );
}
