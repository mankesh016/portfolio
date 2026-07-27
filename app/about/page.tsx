import MiniWindow from "@/components/MiniWindow";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <MiniWindow>
      <p className="font-mono text-sm text-neutral-400">cd ./about</p>
      <p className="mt-2 text-sm text-neutral-500">This page isn't built yet — check back soon.</p>
    </MiniWindow>
  );
}
