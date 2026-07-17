import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Stack } from "@/components/Stack";
import { DevOpsAmbient } from "@/components/DevOpsAmbient";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        {/* <DevOpsAmbient /> */}
        <Experience />
        <Projects />
      </main>
      <Contact />
    </>
  );
}
