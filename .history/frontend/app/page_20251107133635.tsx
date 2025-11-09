import { Hero } from "@/components/hero";
import { GetRecruited } from "@/components/get-recruited";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { AmbitiousProjects } from "@/components/ambitious-projects";
import { Verticals } from "@/components/verticals";
import { LongLiveLearning } from "@/components/long-live-learning";
import { Benefits } from "@/components/benefits";
import { Methodology } from "@/components/methodology";

export default function Home() {
  return (
    <>
      <Hero />
      <GetRecruited />
      <ProjectsShowcase />
      <AmbitiousProjects />
      <Verticals />
      <LongLiveLearning />
      <Benefits />
      <Methodology />
    </>
  );
}
