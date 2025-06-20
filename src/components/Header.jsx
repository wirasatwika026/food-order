"use client";
import CartDrawer from "@/components/CartDrawer"; // Adjust path if needed
import { useFetchCartFromLocalStorage } from "@/queries/cart-queries";
import { Button } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Example cart icon
import { useState } from "react";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const { data: cartItems } = useFetchCartFromLocalStorage();

  const itemCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="bg-white dark:bg-gray-900/80 shadow-md p-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Food App
        </h1>
        <Button
          onClick={() => setCartOpen(true)}
          className="relative p-2 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          aria-label="Open shopping cart"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
      <CartDrawer open={cartOpen} setOpen={setCartOpen} />
    </header>
  );
}
