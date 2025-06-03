import ThemeSwitch from "@/components/ThemeSwitch";
import Timer from "@/components/Timer";
import { createClient } from "@/utils/supabase/server";
import { ISOStringToMilliseconds } from "@/utils/utils";
import Image from "next/image";

// Menu Card Component
function MenuCard({ menu }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full max-w-sm">
      <div className="h-48 relative">
        <Image
          src={menu.image_url}
          alt={menu.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold dark:text-white">{menu.name}</h3>
          <span className="text-green-600 font-bold">{formatPrice(menu.price)}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{menu.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stock: {menu.stock}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("menus").select();

  if (error) {
    console.error("Error fetching countdown data:", error);
    return <div>Error loading countdown</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black">
      <nav className="absolute top-0 right-0 p-4">
        <ThemeSwitch />
      </nav>
      <div className="py-12">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Our Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
}
