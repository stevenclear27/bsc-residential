import PortfolioSection from "@/components/PortfolioSection";
import IntroSection from "@/components/IntroSection";

export default function PortfolioPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full">
      <IntroSection />
      <PortfolioSection />
    </main>
  );
}
