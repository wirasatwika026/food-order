import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <HeroSection />
      <MenuSection />
    </div>
  );
}
