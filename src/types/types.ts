// types/project.ts
import { AppRouter } from "@/trpc/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";

export type RouterOutputs = inferRouterOutputs<AppRouter>;

type Projects = RouterOutputs["projects"]["getAll"]["projects"];
export type Project = Projects[number];

// For featured cards
export type FeaturedCardProps = 
  Pick<Project, "imgSrc" | "title" | "description"> & {
    link: Project["webLink"];
    github: Project["githubLink"];
    technologies: string[];
  };

// For project cards
export type ProjectCardProps = 
  Pick<Project, "imgSrc" | "title" | "description"> & {
    link: Project["webLink"];
    github: Project["githubLink"];
    technologies: string[];
    isFeatured: Project["isFeatured"];
  };

// For data table display
export type FormattedProjectForTable = {
  id: Project["id"];
  title: Project["title"];
  description: Project["description"];
  isFeatured: Project["isFeatured"];
  isArchived: Project["isArchived"];
  technologies: TechnologyOption[];
  createdAt: string; // formatted date string
};

// For project form editing
export type ProjectFormData = Pick<
  Project,
  "id" | "title" | "description" | "webLink" | "githubLink" | "imgSrc" | "isFeatured" | "isArchived"
> & {
  technologies: Array<{
    technologyId: string;
  }>;
};

// Get Technology type from tRPC
type Technologies = RouterOutputs["technologies"]["getAll"]["technologies"];
export type Technology = Technologies[number];

// Reusable technology option type
export type TechnologyOption = {
  id: Technology["id"];
  title: Technology["title"];
};

// For technology options in forms/dropdowns
export type FormattedTechnologiesData = {
  technologies: TechnologyOption[];
};

export type FormattedTechnologyForTable = {
  id: Technology["id"];
  title: Technology["title"];
  createdAt: string;
};