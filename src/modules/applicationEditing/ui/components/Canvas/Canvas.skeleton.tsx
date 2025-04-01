import { Skeleton } from "@/common/ui/components/skeleton";

export const CanvasSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col items-stretch gap-4 bg-white p-4">
      <Skeleton className="h-16" />
      <div className="flex h-96 flex-1 gap-4">
        <Skeleton className="w-60" />
        <Skeleton className="flex-1" />
      </div>
      <Skeleton className="h-20" />
    </div>
  );
};
