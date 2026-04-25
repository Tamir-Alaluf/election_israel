import { Skeleton } from "@/components/ui/skeleton";

export default function PartiesLoading() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 py-8">
        <div className="space-y-3 mb-6">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-md" />
            ))}
          </div>
          <Skeleton className="h-4 w-32 ms-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-3 p-3"
            >
              <Skeleton className="h-14 w-14 rounded-full shrink-0" />
              <div className="w-full space-y-2 px-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
