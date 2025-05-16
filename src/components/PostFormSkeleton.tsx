export default function PostFormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse space-y-8">
      {/* Title Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/6" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/6" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>

      {/* Slug Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/6" />
        <div className="h-10 bg-gray-200 rounded opacity-50" />
      </div>

      {/* Tags Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/6" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>

      {/* Content Editor Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/6" />
        <div className="h-[500px] bg-gray-200 rounded-lg" />
      </div>

      {/* Buttons Skeleton */}
      <div className="flex justify-end gap-4">
        <div className="h-10 bg-gray-200 rounded w-24" />
        <div className="h-10 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
}
