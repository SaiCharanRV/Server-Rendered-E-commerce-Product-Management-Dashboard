export default function Loading() {
  return (
    <div className="p-8 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="h-10 w-64 bg-gray-200 rounded mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column Skeletons */}
        <div className="space-y-6">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-[500px] bg-gray-200 rounded-xl"></div>
        </div>

        {/* Right Column Skeletons */}
        <div className="space-y-6">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-[500px] bg-gray-200 rounded-xl"></div>
        </div>
        
      </div>
    </div>
  );
}