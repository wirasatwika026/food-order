export default function MenuSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-5 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
