"use client";

export default function CodeIcon({ slug, name }: { slug: string; name: string }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/gray`}
      alt={name}
      className="h-4 w-4"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
