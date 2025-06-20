"use client";
import ShippingAddress from "@/app/checkout/_components/ShippingAddress";
import Payment from "@/app/checkout/_components/Payment";
import Confirmation from "@/app/checkout/_components/Confirmation";
import { Stepper } from "@/components/ui/stepper";
import {
  useAddAddress,
  useAddCustomer,
  useAddOrder,
  useFetchCartFromLocalStorage,
  useRemoveFromCart,
} from "@/queries/cart-queries";
import { formatPrice } from "@/utils/formatters";
// import { Button } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Customers from "@/app/checkout/_components/Customers";

export default function PageCheckout() {
  const { data: cartItems, isLoading, error } = useFetchCartFromLocalStorage();
  const { mutate: removeItem, isPending: isRemovingItem } = useRemoveFromCart();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const { mutate: addAddress } = useAddAddress();
  const { mutate: addCustomer } = useAddCustomer();
  const router = useRouter();

  // Form data from each step
  const [formData, setFormData] = useState({
    shipping: null,
    payment: null,
  });

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

  const steps = [
    { label: "Cart", description: "Review your items" },
    { label: "Customer", description: "Add customer info" },
    { label: "Shipping", description: "Enter shipping info" },
    { label: "Payment", description: "Choose payment method" },
    { label: "Confirmation", description: "Finish your order" },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0); // -1: back, 1: next

  const handleNext = () => {
    setDirection(1);
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  // Handler for shipping form data submission
  const handleCustomerSubmit = (data) => {
    setFormData((prev) => ({ ...prev, customers: data }));
    addCustomer(data);
    handleNext();
  };

  // Handler for shipping form data submission
  const handleShippingSubmit = (data) => {
    setFormData((prev) => ({ ...prev, shipping: data }));
    addAddress(data);
    handleNext();
  };

  // Handler for payment form data submission
  const handlePaymentSubmit = (data) => {
    setFormData((prev) => ({ ...prev, payment: data }));
    handleNext();
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
    }),
  };

  const handleCompleteOrder = () => {
    // TODO : Complete Order
    handleNext();
  };

  const handleSaveAddress = (address) => {};

  return (
    <div className="min-h-screen p-6 overflow-x-hidden">
      <section className="   p-4 rounded-md">
        <div>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            orientation="horizontal"
            size="md"
          />

          <div className="relative min-h-[540px] mt-6">
            <AnimatePresence custom={direction} mode="wait">
              {activeStep === 0 && (
                <motion.div
                  key={0}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="max-w-xl mx-auto">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle>My Cart</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isLoading ? (
                          <p>Loading cart items...</p>
                        ) : cartItems?.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-lg mb-4">Your cart is empty</p>
                            <Button onClick={() => router.push("/")}>
                              Continue Shopping
                            </Button>
                          </div>
                        ) : (
                          <>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                              {cartItems?.map((item) => (
                                <li key={item.item_id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                    <Image
                                      src={
                                        item.image_url ||
                                        "/default-menu-image.png"
                                      }
                                      alt={item.item_name || "Product image"}
                                      width={96}
                                      height={96}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                        <h3>{item.item_name}</h3>
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
                                          className="cursor-pointer text-red-600   p-1 -m-1 rounded-md  transition-colors duration-200"
                                          onClick={() =>
                                            openConfirmationModal({
                                              id: item.item_id,
                                              name: item.item_name,
                                            })
                                          }
                                          disabled={
                                            isRemovingItem &&
                                            item.item_id === itemToRemove?.id
                                          }
                                        >
                                          {isRemovingItem &&
                                          item.item_id === itemToRemove?.id ? (
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

                            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                <p>Subtotal</p>
                                <p>{formatPrice(subtotal)}</p>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                Shipping and taxes calculated at checkout.
                              </p>
                            </div>
                          </>
                        )}
                        {cartItems?.length !== 0 && (
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleCompleteOrder}
                          >
                            Complete Order
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
              {activeStep === 1 && (
                <motion.div
                  key={1}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="max-w-xl mx-auto">
                    <Customers onSubmit={handleCustomerSubmit} />
                  </div>
                </motion.div>
              )}
              {activeStep === 2 && (
                <motion.div
                  key={1}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="max-w-xl mx-auto">
                    <ShippingAddress onSubmit={handleShippingSubmit} />
                  </div>
                </motion.div>
              )}
              {activeStep === 3 && (
                <motion.div
                  key={2}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="max-w-xl mx-auto">
                    <Payment
                      onSubmit={handlePaymentSubmit}
                      subtotal={subtotal}
                    />
                  </div>
                </motion.div>
              )}
              {activeStep === 4 && (
                <motion.div
                  key={3}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="max-w-3xl mx-auto">
                    <Confirmation
                      formData={{
                        ...formData.shipping,
                        ...formData.payment,
                      }}
                      cartItems={cartItems}
                      subtotal={subtotal}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-4 mt-8 justify-center">
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              className=" disabled:opacity-50"
            >
              Back
            </Button>
            {true && (
              <Button onClick={handleNext} className=" ">
                Next
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
