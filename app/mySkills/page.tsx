"use client";

import App from "@/components/logo";
import { motion } from "framer-motion";

export default function Skills() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="w-full px-4 py-16 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Section Header with Scroll Animation */}
     <div className="max-w-6xl mx-auto ">
     <motion.div 
        className="flex flex-col items-start mb-12 space-y-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
        My  Technical Skills
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-sm md:text-base">
          A focused breakdown of the technologies, frameworks, and tools I use to build production-ready web applications.
        </p>
      </motion.div>
     </div>

      {/* Logo Loop Wrapper with a slight delay animation */}
     <div>
     <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
          }
        }}
      >
        <App />
      </motion.div>
     </div>
      
    </section>
  );
}