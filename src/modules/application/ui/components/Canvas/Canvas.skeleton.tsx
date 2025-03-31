import { Skeleton } from "@/common/ui/components/skeleton";

export const CanvasSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 p-4 items-stretch bg-white gap-4">
      <Skeleton className="h-16" />
      <div className="flex flex-1 gap-4 h-96">
        <Skeleton className="w-60" />
        <Skeleton className="flex-1" />
      </div>
      <Skeleton className="h-20" />
    </div>
  );
};
