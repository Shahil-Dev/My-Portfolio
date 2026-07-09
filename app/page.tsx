import Hero from "@/components/Hero";
import About from "./about/page";
import App from "@/components/logo";
import Skills from "./mySkills/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
    </main>
  );
}
