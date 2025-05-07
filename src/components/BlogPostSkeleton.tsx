export default function BlogPostSkeleton() {
  return (
    <div className="relative z-10 max-w-2xl mx-auto mb-8 p-6 md:p-10 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-2xl border border-primary/10 flex flex-col gap-8 animate-pulse">
      <div className="w-full h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800 mb-6" />
      <div className="h-10 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded mb-4" />
      <div className="flex gap-4 mb-2">
        <div className="h-6 w-32 bg-primary/20 rounded-full" />
        <div className="h-6 w-24 bg-purple-100 dark:bg-purple-900/20 rounded-full" />
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="flex items-center gap-3 mt-6">
        <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-16 bg-primary/10 rounded-full" />
        <div className="h-6 w-16 bg-primary/10 rounded-full" />
      </div>
    </div>
  );
}
