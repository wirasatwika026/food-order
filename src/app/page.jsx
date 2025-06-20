import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  return (
    <div className="min-h-screen p-6 bg-secondary text-coffee-dark">
      <Header />
      <HeroSection />
      <MenuSection />
    </div>
  );
}
