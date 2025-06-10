import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Order?
        </h2>
        <p className="text-white text-lg mb-8 max-w-xl mx-auto">
          Download our app now and get your first delivery fee waived. Plus,
          earn loyalty points with every order!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100"
          >
            Order Online
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-orange-600"
          >
            Download App
          </Button>
        </div>
      </div>
    </section>
  );
}
