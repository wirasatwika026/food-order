export default function CategorySkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto flex overflow-x-auto pb-2 justify-start md:justify-center gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
}
