
import { ArticleSection } from './components/ArticleSection';
import { Footer } from './components/FooterComponent';
import HeroSection from './components/HeroSection'
import { ProjectShowcase } from "./components/project-showcase";
export default function Home() {
  return (
    <div className="container mx-auto items-center justify-items-center min-h-screen  font-[family-name:var(--font-inter)]">
      <HeroSection />
      <ProjectShowcase />
      <ArticleSection />
      <Footer />
    </div>
  );
}
