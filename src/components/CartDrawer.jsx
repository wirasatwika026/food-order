import React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CartDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Open Drawer</Button> */}
        <div className="flex text-orange-500 gap-2 items-center  px-4 py-2 rounded-lg shadow-md  transition-colors">
          <ShoppingCart />
          <p>Cart</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="size-full p-4 flex flex-col gap-4">
          <h1 className="text-2xl">Your Order</h1>
          <Separator />
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product"
                  className="w-12 h-12 rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">Product Name</h2>
                  <p className="text-sm text-gray-500">Quantity: 1</p>
                </div>
              </div>
              <p className="text-lg font-semibold">$10.00</p>
            </div>
          </div>
          <div>
            <Separator className={"my-2"} />
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold">$10.00</p>
            </div>
            <Button className={"mt-2 w-full"}>Checkout</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
