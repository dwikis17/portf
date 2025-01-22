import Image from "next/image";
import HeroSection from './components/HeroSection'
import { ProjectShowcase } from "./components/project-showcase";
export default function Home() {
  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen  font-[family-name:var(--font-inter)]">
      <HeroSection />
      <ProjectShowcase />
    </div>
  );
}
