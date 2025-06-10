import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative h-80 lg:h-96 w-full max-w-lg mx-auto md:mr-0">
              <Image
                src="https://supabase.theawe.web.id/storage/v1/object/public/food-app/real_food/restaurant.jpg"
                alt="Our Restaurant"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About Our Restaurant
            </h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, our restaurant has been serving delicious meals
              made from the freshest ingredients. We pride ourselves on using
              traditional recipes with a modern twist.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of experienced chefs is passionate about creating
              memorable dining experiences for our customers, whether you're
              dining in or ordering delivery.
            </p>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-orange-500">5+</p>
                <p className="text-gray-700">Years of Service</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-orange-500">50+</p>
                <p className="text-gray-700">Menu Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
