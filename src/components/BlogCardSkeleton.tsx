export default function BlogCardSkeleton() {
  return (
    <div className="flex flex-col bg-primary/5 dark:bg-primary/10 rounded-xl shadow-md border border-primary/10 overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-700 rounded" />
        <div className="h-6 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded" />
        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="flex items-center gap-2 mt-2">
          <div className="h-8 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}
