import Link from "next/link";

type Chunk = { label: string; href?: string };

export default function PageHeader({
  trail,
  heading,
  subtitle,
}: {
  trail: Chunk[];
  heading?: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm text-neutral-400">
        {trail.map((chunk, i) => (
          <span key={i}>
            {chunk.href ? (
              <Link href={chunk.href} className="hover:text-neutral-600">
                {chunk.label}
              </Link>
            ) : (
              <span className="text-neutral-700">{chunk.label}</span>
            )}
            {i < trail.length - 1 && " / "}
          </span>
        ))}
      </p>

      {heading && <h1 className="mt-6 text-4xl font-bold text-neutral-900">{heading}</h1>}
      {subtitle && <p className="mt-2 text-neutral-500">{subtitle}</p>}
    </div>
  );
}
