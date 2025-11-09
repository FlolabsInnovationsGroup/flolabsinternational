import { Hero } from "@/components/hero";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { Verticals } from "@/components/verticals";
import { Benefits } from "@/components/benefits";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsShowcase />
      <Verticals />
      <Benefits />
    </>
  );
}
