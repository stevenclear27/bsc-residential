import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-950 text-zinc-50 w-full">
      <HeroSection />
      <IntroSection />
    </main>
  );
}
