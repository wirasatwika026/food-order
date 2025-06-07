"use client";

import { Button } from "@headlessui/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-gray-700 dark:to-gray-800">
      <div className="container mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center">
        {/* Left Column: Text Content */}
        <div className="md:w-1/2 lg:w-3/5 text-center md:text-left mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Delicious Food, Delivered to You
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8">
            Order your favorite meals from our wide selection and enjoy a
            hassle-free dining experience.
          </p>
          <Button
            className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300 text-lg"
            onClick={() =>
              document
                .getElementById("menu-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Our Menu
          </Button>
        </div>

        {/* Right Column: Image */}
        <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://supabase.theawe.web.id/storage/v1/object/public/food-app/real_food/pizza_food.png" // Replace with your actual image path
              alt="Delicious food platter"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority // Good to add for LCP images
            />
          </div>
        </div>
      </div>
    </section>
  );
}
