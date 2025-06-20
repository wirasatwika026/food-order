"use client";
import Image from "next/image";
import {
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"; // For a close icon
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { formatPrice } from "@/utils/formatters";
import { Input } from "@/components/ui/input";
import {
  useFetchCartById,
  useFetchCartFromLocalStorage,
} from "@/queries/cart-queries";

export default function ProductDetailModal({ menu, onClose, onAddToCart }) {
  const { data: cartItem } = useFetchCartById(menu?.id);
  const [quantity, setQuantity] = useState(0);
  const isOutOfStock = menu.stock === 0;

  useEffect(() => {
    if (menu) {
      setQuantity(cartItem?.quantity ?? 0);
    }
  }, [menu, cartItem]);

  const handleQuantityChange = (value) => {
    if (isOutOfStock) return; // Prevent changing quantity if out of stock
    const newQuantity = value.target.value;
    if (newQuantity < 0) {
      setQuantity(0); // Prevent negative quantity
      return;
    }
    if (newQuantity > menu.stock) {
      setQuantity(menu.stock); // Prevent exceeding stock
      return;
    }
    setQuantity(newQuantity);
  };

  const handleIncrement = () => {
    if (isOutOfStock) return; // Prevent incrementing if out of stock
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      return newQuantity > menu.stock ? menu.stock : newQuantity; // Prevent exceeding stock
    });
  };

  const handleDecrement = () => {
    if (isOutOfStock) return; // Prevent decrementing if out of stock
    setQuantity((prev) => {
      const newQuantity = prev - 1;
      return newQuantity < 0 ? 0 : newQuantity; // Prevent going below zero
    });
  };

  return (
    <Transition appear show={!!menu} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden text-left align-middle flex flex-col md:flex-row transform transition-all">
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <Image
                    src={menu.image_url || "/default-menu-image.png"}
                    alt={menu.item_name || "Menu item image"}
                    fill
                    className="object-cover md:rounded-l-lg md:rounded-t-none" // Removed rounded-t-lg for full height image on mobile
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
                  <div className="flex justify-between items-start mb-3">
                    <DialogTitle
                      as="h2"
                      id="product-modal-title"
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                      {menu.item_name || "Unnamed Item"}
                    </DialogTitle>
                    <Button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      aria-label="Close modal"
                    >
                      <XMarkIcon className="h-6 w-6 cursor-pointer" />
                    </Button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                    {menu.description || "No description available."}
                  </p>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2 gap-2">
                      <h3>Quantity</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleDecrement}
                          className="items-center  placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer"
                          disabled={isOutOfStock || quantity <= 0}
                        >
                          <MinusIcon className="w-5 h-5" />
                        </button>
                        <Input
                          type={"number"}
                          placeholder="Quantity"
                          className={
                            "w-20 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          }
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                        <button
                          onClick={handleIncrement}
                          className="items-center  placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer "
                          disabled={isOutOfStock || quantity >= menu.stock}
                        >
                          <PlusIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-green-600 dark:text-green-500">
                        {formatPrice(menu.price)}
                      </span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          isOutOfStock
                            ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200"
                            : "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200"
                        }`}
                      >
                        {isOutOfStock ? "Out of Stock" : `Stock: ${menu.stock}`}
                      </span>
                    </div>

                    <Button
                      className={`w-full px-4 py-2.5 rounded-md font-semibold text-sm transition-colors duration-200 cursor-pointer
                                  ${
                                    isOutOfStock
                                      ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                      : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                                  }
                                      disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={isOutOfStock || quantity <= 0}
                      aria-label={`Add ${menu.name || "item"} to cart`}
                      onClick={() =>
                        !isOutOfStock &&
                        onAddToCart &&
                        onAddToCart({ ...menu, quantity })
                      }
                    >
                      {isOutOfStock ? "Unavailable" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
