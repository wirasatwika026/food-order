import { useFetchAllMenus } from "@/queries/menu-queries";
import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton"; // Import the skeleton component
import { useState } from "react";

const MenuSection = () => {
  const { data: menuData, error, isLoading } = useFetchAllMenus();

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleOpenModal = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleCloseModal = () => {
    setSelectedMenuItem(null);
  };

  if (isLoading) {
    return (
      <section id="menu-section-loading" className="py-12">
        <h1 className="text-3xl font-bold text-center mt-12 mb-8 text-primary">
          Our Menu
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[...Array(6)].map((_, index) => (
            <MenuCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error fetching menu data via React Query:", error);
    return (
      <div className="min-h-screen p-6 flex items-center justify-center bg-secondary text-primary">
        Error loading menu data. Please try again later. (Using primary text on
        secondary background)
      </div>
    );
  }

  return (
    <>
      <section id="menu-section" className="py-12">
        <h1 className="text-3xl font-bold text-center mt-12 mb-8 text-primary">
          Our Menu
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuData && menuData.length > 0 ? (
            menuData.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                onViewDetails={() => handleOpenModal(menu)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-coffee-light">
              No menu items available at the moment.
            </p>
          )}
        </div>
      </section>
      {selectedMenuItem && (
        <ProductDetailModal
          menu={selectedMenuItem}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MenuSection;
