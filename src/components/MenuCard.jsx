import Image from "next/image";
import { formatPrice } from "@/utils/formatters";
import { Button } from "@headlessui/react";

export default function MenuCard({ menu, onViewDetails }) {
  if (!menu) return null;

  const isOutOfStock = menu.stock === undefined || menu.stock === 0;

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full max-w-sm transition-all duration-300 hover:shadow-lg group">
      <div className="h-48 relative overflow-hidden">
        <Image
          src={menu.image_url || "/default-menu-image.png"}
          alt={menu.item_name || "Menu item image"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div
        className="p-4 flex flex-col flex-grow cursor-pointer"
        onClick={onViewDetails}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onViewDetails()}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-2">
            {menu.item_name || "Unnamed Item"}
          </h3>
          <span className="text-md font-bold text-green-600 dark:text-green-500 whitespace-nowrap">
            {formatPrice(menu.price)}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow min-h-[2.5rem] line-clamp-2">
          {menu.description || "No description available."}
        </p>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
          <span
            className={`text-xs font-medium ${
              isOutOfStock
                ? "text-red-600 dark:text-red-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : `Stock: ${menu.stock}`}
          </span>
          <Button
            className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors duration-200 
                        ${
                          isOutOfStock
                            ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                        }`}
            disabled={isOutOfStock}
            aria-label={`Add ${menu.item_name || "item"} to cart`}
          >
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
