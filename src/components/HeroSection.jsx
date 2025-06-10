"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className=" py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left Column: Text */}
        <div className="md:w-1/2 lg:w-3/5 text-center md:text-left mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight ">
            Fresh Food,
            <br />
            <span className="text-orange-500">Quick Delivery</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 ">
            Enjoy chef-crafted meals delivered to your doorstep in minutes.
            Fresh ingredients, authentic taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() =>
                document
                  .getElementById("menu-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse Menu
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              How It Works
            </Button>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end">
          <div className="relative w-full max-w-lg h-80 lg:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://supabase.theawe.web.id/storage/v1/object/public/food-app/real_food/pizza_food.png"
              alt="Delicious food platter"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
