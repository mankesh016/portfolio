export default function ProjectMedia({ mediaType, mediaUrl }: { mediaType: string; mediaUrl: string | null }) {
  if (!mediaUrl || mediaType === "none") return null;

  if (mediaType === "image") {
    return <img src={mediaUrl} alt="" className="w-[50%] rounded-xl border border-stone-300 object-cover" />;
  }
  if (mediaType === "video") {
    return (
      <video src={mediaUrl} autoPlay muted loop playsInline className="w-full rounded-xl border border-stone-300" />
    );
  }
  if (mediaType === "youtube") {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-stone-300">
        <iframe
          src={`https://www.youtube.com/embed/${mediaUrl}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return null;
}
