import Hero from "@/components/Hero";

import Skills from "./mySkills/page";
import About from "./about/page";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects/>
      <Contact/>
    </main>
  );
}
