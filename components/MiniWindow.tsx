export default function MiniWindow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-neutral-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
