
import { Footer } from './components/FooterComponent';
import HeroSection from './components/HeroSection'
import PortfolioShowcase from './components/portfolio-showcase';

export default function Home() {
  return (
    <div className="container mx-auto items-center justify-items-center min-h-screen  font-[family-name:var(--font-inter)]">
      <HeroSection />
      <PortfolioShowcase />
      <Footer />
    </div>
  );
}
