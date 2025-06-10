import CartDrawer from "@/components/CartDrawer";
import React from "react";

export default function Navbar() {
  return (
    <div className="backdrop-blur-md sticky top-0 z-[50] px-8 py-4 flex justify-between">
      <div className=" items-center gap-4 sm:flex hidden ">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className=" text-lg font-bold leading-tight tracking-[-0.015em]">
          Food and Order
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" className="leading-normal">
          Home
        </a>
        <a href="#" className="leading-normal">
          Menus
        </a>
      </div>
      <div>
        <CartDrawer />
      </div>
    </div>
  );
}
