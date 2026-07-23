import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeroSection />
      <IntroSection />
    </main>
  );
}
