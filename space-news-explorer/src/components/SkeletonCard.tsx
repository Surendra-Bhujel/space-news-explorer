export function SkeletonCard() {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="aspect-[16/10] animate-shimmer" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full animate-shimmer" />
          <div className="h-5 w-24 rounded-full animate-shimmer" />
        </div>
        <div className="h-5 rounded w-full animate-shimmer" />
        <div className="h-5 rounded w-4/5 animate-shimmer" />
        <div className="h-4 rounded w-full animate-shimmer" />
        <div className="h-4 rounded w-3/4 animate-shimmer" />
      </div>
    </div>
  );
}