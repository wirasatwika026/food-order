import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function FeaturesSection() {
  const features = [
    {
      icon: ClockIcon,
      title: "Fast Delivery",
      description:
        "We deliver your food within 30 minutes of ordering, hot and fresh.",
    },
    {
      icon: CheckCircleIcon,
      title: "Quality Ingredients",
      description:
        "We use only the freshest, high-quality ingredients in all our dishes.",
    },
    {
      icon: TruckIcon,
      title: "Free Delivery",
      description:
        "Free delivery on all orders over $20 within our delivery zone.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
          <p className="mt-2 text-gray-600">
            We provide the best food ordering experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 text-orange-500">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
