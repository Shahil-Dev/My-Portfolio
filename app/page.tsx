import Hero from "@/components/Hero";


import About from "./about/page";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Skill from "./Skills/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skill></Skill>
      <Projects/>
      <Contact/>
    </main>
  );
}
