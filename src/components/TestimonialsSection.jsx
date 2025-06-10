import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "The food is always fresh and delicious. Delivery is prompt and the app is very easy to use!",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      comment:
        "Great selection of dishes and reasonable prices. The only reason it's not 5 stars is because I wish they had more vegetarian options.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 5,
      comment:
        "I order from here at least once a week. The quality is consistently excellent and customer service is top-notch.",
    },
  ];

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
      ) : (
        <StarOutline key={i} className="h-5 w-5 text-yellow-400" />
      )
    );
  };

  return (
    <section className="bg-orange-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-gray-600">Don't just take our word for it</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.comment}"
              </p>
              <p className="font-medium text-gray-800">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
