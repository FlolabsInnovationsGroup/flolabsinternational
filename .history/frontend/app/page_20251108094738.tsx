import { Hero } from "@/components/hero";
import { GetRecruited } from "@/components/get-recruited";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { AmbitiousProjects } from "@/components/ambitious-projects";
import { Verticals } from "@/components/verticals";
import { LongLiveLearning } from "@/components/long-live-learning";
import { Benefits } from "@/components/benefits";
import { Methodology } from "@/components/methodology";
import { getProjects } from "@/lib/strapi";

export default async function Home() {
  const projects = await getProjects();
  
  return (
    <>
      <Hero />
      <GetRecruited />
      <ProjectsShowcase projects={projects} />
      <AmbitiousProjects />
      <Verticals />
      <LongLiveLearning />
      <Benefits />
      <Methodology />
    </>
  );
}
