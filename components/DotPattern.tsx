export default function DotPattern({ className = "" }: { className?: string }) {
  const dotLayerStyle: React.CSSProperties = {
    backgroundImage: "radial-gradient(circle, rgb(163 163 163 / 0.6) 1px, transparent 1.5px)",
    backgroundSize: "14px 14px",
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, transparent 50%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 50%, black 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ ...dotLayerStyle, animation: "dot-blink-a 3s ease-in-out infinite" }}
      />
      <div
        className="absolute inset-0"
        style={{ ...dotLayerStyle, backgroundPosition: "7px 7px", animation: "dot-blink-b 7s ease-in-out infinite" }}
      />
    </div>
  );
}
