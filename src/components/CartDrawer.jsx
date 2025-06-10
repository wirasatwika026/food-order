import { Fragment, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  useFetchCartFromLocalStorage,
  useRemoveFromCart,
} from "@/queries/cart-queries";
import { TrashIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import ConfirmationModal from "./ConfirmationModal";

/* TODO: implement with quantity */

export default function CartDrawer({ open, setOpen }) {
  const { data: cartItems, isLoading, error } = useFetchCartFromLocalStorage();
  const { mutate: removeItem, isPending: isRemovingItem } = useRemoveFromCart();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  console.log("🚀 ~ CartDrawer ~ itemToRemove:", itemToRemove);

  const subtotal = useMemo(() => {
    return (
      cartItems?.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
      ) || 0
    );
  }, [cartItems]);

  const openConfirmationModal = (item) => {
    setItemToRemove(item);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmModalOpen(false);
    setItemToRemove(null);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeItem(itemToRemove.id, {
        onSuccess: closeConfirmationModal,
        onError: closeConfirmationModal,
      });
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-50" onClose={() => setOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white">
                          Shopping cart
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {isLoading && (
                            <p className="text-center text-gray-500 dark:text-gray-400">
                              Loading cart...
                            </p>
                          )}
                          {error && (
                            <p className="text-center text-red-500">
                              Error loading cart.
                            </p>
                          )}
                          {!isLoading &&
                            !error &&
                            (!cartItems || cartItems.length === 0) && (
                              <p className="text-center text-gray-500 dark:text-gray-400">
                                Your cart is empty.
                              </p>
                            )}
                          <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                            {cartItems?.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                  {/* Assuming item might have an image_url, otherwise a placeholder */}
                                  <Image
                                    src={
                                      item.image_url ||
                                      "/default-menu-image.png"
                                    }
                                    alt={item.name || "Product image"}
                                    width={96}
                                    height={96}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">
                                        {formatPrice(
                                          item.price * (item.quantity ?? 1)
                                        )}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                      Qty: {item.quantity ?? 1}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500 dark:text-gray-400">
                                      Unit Price: {formatPrice(item.price)}
                                    </p>
                                    <div className="flex">
                                      <Button
                                        type="button"
                                        className="cursor-pointer text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 p-1 -m-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                        onClick={() =>
                                          openConfirmationModal({
                                            id: item.id,
                                            name: item.name,
                                          })
                                        }
                                        disabled={
                                          isRemovingItem &&
                                          item.id === itemToRemove?.id // Check against item being confirmed for removal
                                        }
                                      >
                                        {isRemovingItem &&
                                        item.id === itemToRemove?.id ? (
                                          "Removing..."
                                        ) : (
                                          <TrashIcon className="h-6 w-6" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {cartItems && cartItems.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <p>Subtotal</p>
                          <p>{formatPrice(subtotal)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Button
                            href="#"
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
      {itemToRemove && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmationModal}
          onConfirm={handleConfirmRemove}
          title="Remove Item"
          message={`Are you sure you want to remove "${itemToRemove.name}" from your cart?`}
          confirmButtonText="Remove"
          isConfirming={
            isRemovingItem && itemToRemove?.id === removeItem.variables
          }
        />
      )}
    </Transition>
  );
}
