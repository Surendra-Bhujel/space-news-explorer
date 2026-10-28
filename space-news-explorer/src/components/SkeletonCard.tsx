export function SkeletonCard() {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-slate-700" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-slate-700 rounded-full" />
          <div className="h-5 w-24 bg-slate-700 rounded-full" />
        </div>
        <div className="h-5 bg-slate-700 rounded w-full" />
        <div className="h-5 bg-slate-700 rounded w-4/5" />
        <div className="h-4 bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-700 rounded w-3/4" />
      </div>
    </div>
  );
}